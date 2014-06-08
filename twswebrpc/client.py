# Copyright 2013 Djebran Lezzoum All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from zope.interface import implementer

from twisted.internet import reactor

from twisted.internet.protocol import Protocol, connectionDone
from twisted.internet.defer import Deferred, maybeDeferred, succeed

from twisted.python.failure import Failure

from twisted.web.client import Agent, HTTPConnectionPool, ContentDecoderAgent, GzipDecoder, ResponseDone
from twisted.web.http_headers import Headers
from twisted.web.iweb import IBodyProducer

from encoder import JSONEncoder, JellyEncoder, IEncoder


class StdError(Exception):
    """standard  error"""

    def __str__(self):
        s = self.__doc__
        if self.args:
            s = '%s: %s' % (s, ' '.join(self.args))
        s = '%s.' % s
        return s


class UnknownProtocol(StdError):
    """Unknown transfer protocol"""


class ServerError(StdError):
    """server Error"""


class WrongServerData(StdError):
    """Wrong server data"""


class WrongEncoding(StdError):
    """Wrong client data"""


class DataReceiver(Protocol):

    def __init__(self, finished, encoder):
        self.finished = finished
        self.encoder = encoder
        self.dataBytes = None

    def dataReceived(self, dataBytes):
        if self.dataBytes:
            self.dataBytes += dataBytes
        else:
            self.dataBytes = dataBytes

    def connectionLost(self, reason=connectionDone):
        if reason.check(ResponseDone):
            try:
                response = self.encoder.decode(self.dataBytes)

            except (ValueError, IndexError):
                self.finished.errback(Failure(UnknownProtocol('error when decoding the server response')))

            else:
                if isinstance(response, dict) and 'error' in response and 'result' in response:
                    errorData = response.get('error')
                    if errorData:
                        if isinstance(errorData, dict) and 'message' in errorData:
                            errorMessage = 'server error - %s - %s' % (errorData.get('name', ''), errorData['message'])
                            self.finished.errback(Failure(ServerError(errorMessage)))
                        else:
                            self.finished.errback(Failure(
                                WrongServerData('error occurred but can not read from transferred response')))
                    else:
                        self.finished.callback(response['result'])

                else:
                    self.finished.errback(Failure(WrongServerData('the server data received is not conform')))

        else:
            self.finished.errback(reason)


@implementer(IBodyProducer)
class StringProducer(object):

    def __init__(self, body):
        self.body = body
        self.length = len(body)

    def startProducing(self, consumer):
        consumer.write(self.body)
        return succeed(None)

    def stopProducing(self):
        pass


class JSONClient(object):

    protocolName = 'jsonrpc'
    protocolVersion = '2.0'
    protocolContentType = 'text/json'

    userAgentName = 'twswebrpc'

    def __init__(self, url, callID=0, maxPersistentPerHost=2, useCompression=False):

        self.url = url
        self.encoder = self.get_encoder()
        if not IEncoder.providedBy(self.encoder):
            raise Exception('no encoder available or encoder does not provide IEncoder')

        self.callID = callID
        self.callsCounter = 0
        if maxPersistentPerHost > 0:
            self.pool = HTTPConnectionPool(reactor, persistent=True)
            self.pool.maxPersistentPerHost = maxPersistentPerHost
        else:
            self.pool = None

        agent = Agent(reactor, pool=self.pool)
        if useCompression:
            self.agent = ContentDecoderAgent(agent, [('gzip', GzipDecoder)])
        else:
            self.agent = agent

    def get_encoder(self):
        return JSONEncoder()

    def callRemote(self, function, *params):

        data = dict(id='ID%s' % self.callID,
                    method=function,
                    params=params)

        data[self.protocolName] = self.protocolVersion

        encodedData = self.encoder.encode(data)

        deferred = maybeDeferred(self.agent.request, 'POST',
                                 self.url,
                                 Headers({'User-Agent': [self.userAgentName],
                                          "content-type": [self.protocolContentType],
                                          "content-length": [str(len(encodedData))]
                                          }
                                         ),
                                 StringProducer(encodedData)
                                 )

        deferred.addCallback(self._onCallSuccess)
        deferred.addErrback(self._onCallError)
        self.callID += 1
        self.callsCounter += 1

        return deferred

    def _onCallSuccess(self, response):
        if response.code != 200:
            return Failure(ServerError('%s - %s' % (response.code, response.phrase)))

        finished = Deferred()
        finished.addCallback(self._onCallSuccessFinish)
        response.deliverBody(DataReceiver(finished, self.encoder))
        return finished

    def _onCallSuccessFinish(self, response):
        self.callsCounter -= 1
        return response

    def _onCallError(self, response):
        self.callsCounter -= 1
        return response

    def closeCachedConnections(self, callBack=None):
        if self.pool:
            deferred = self.pool.closeCachedConnections()
            if callBack:
                assert callable(callBack)
                return deferred.addCallback(callBack)

            else:
                return deferred

        return None


class JellyClient(JSONClient):

    protocolName = 'jellyrpc'
    protocolVersion = '1.0'
    protocolContentType = 'text/jelly'

    def get_encoder(self):
        return JellyEncoder()
