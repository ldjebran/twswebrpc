#!/usr/bin/env python2.7

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


from twswebrpc import JSONClient
from twisted.internet import reactor
from twisted.internet.defer import Deferred


def consoleRootName(name):
    if name:
        return '%s >>>' % name
    else:
        return '>>>'


def tryStopReactor(result, rpc_client):
    """
    Try to stop the reactor cleanly stopping all the rpc_client cached connections
    :param result is here for deferred that will supply it, not used here
    :param rpc_client: the rpc client used
    :return: return deferred or None
    """
    finished = True
    if rpc_client.callsCounter > 0:
        finished = False

    if finished:
        def allCachedConnectionsClosed(closeCachedConnectionsResult):
            print '%s all cached connections closed' % consoleRootName(rpc_client.protocolName)
            reactor.stop()

        # when all cached connections closed call allCachedConnectionsClosed
        deferred_list = rpc_client.closeCachedConnections(allCachedConnectionsClosed)
        if deferred_list is None:
            # no cached connections, so stop the reactor directly
            reactor.stop()

        return deferred_list


def onResponseSuccess(response):
    print '%s' % consoleRootName('server'), response


def onResponseError(response):
    print '%s' % consoleRootName('server error'), response


def callRemote(rpc_client, method_name, *params, **kwargs):
    assert isinstance(rpc_client, JSONClient), 'rpc_client must be an instance of JSONClient'

    deferred = rpc_client.callRemote(method_name, *params)
    print'%s' % consoleRootName(rpc_client.protocolName), method_name, params

    onSuccess = kwargs.get('onSuccess', None)
    if onSuccess and callable(onSuccess):
        deferred.addCallback(onSuccess)
    else:
        deferred.addCallback(onResponseSuccess)

    onError = kwargs.get('onError', None)
    if onError and callable(onError):
        deferred.addErrback(onError)
    else:
        deferred.addErrback(onResponseError)

    # chain try stop reactor, so we can free the response functions to call it
    stopDeferred = Deferred()
    stopDeferred.addBoth(tryStopReactor, rpc_client)

    # when results came back success or error, fire stopDeferred callBacks
    deferred.chainDeferred(stopDeferred)

    return deferred


# creating the rpc client with url 'http://127.0.0.1:1080'
simpleClient = JSONClient('http://127.0.0.1:1080')

# call echo
callRemote(simpleClient, 'echo', 'hollow world')


# call add and pass other callBacks functions
def addOnSuccess(response):
    print '%s' % consoleRootName('server add'), response


def addOnError(response):
    print '%s' % consoleRootName('server add error'), response

callRemote(simpleClient, 'add', 4, 3, onSuccess=addOnSuccess, onError=addOnError)

# passing a method that do not exist on server
callRemote(simpleClient, 'nonexistant')

# passing a method with wrong arguments and pass only addOnError callBack
#  (for success the default one will be used)
callRemote(simpleClient, 'add', 4, 'i am a wrong argument', onError=addOnError)

# passing a method with less arguments
callRemote(simpleClient, 'add', 4)

print 'reactor >>> starting ...'
reactor.run()
print 'reactor >>> stopped'
