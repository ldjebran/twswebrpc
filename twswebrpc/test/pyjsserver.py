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

from twisted.internet import reactor
from twisted.web import static, server

from twswebrpc import JSONResource


class JSONHandler(JSONResource):

    def initMethods(self):
        self.add_method('echo', self.echo)
        self.add_method('reverse', self.reverse)
        self.add_method('uppercase', self.uppercase)
        self.add_method('echo_client_info', self.echo_client_info, with_request=True)

    def echo(self, msg):
        return msg

    def reverse(self, msg):
        return msg[::-1]

    def uppercase(self, msg):
        return msg.upper()

    def echo_client_info(self, request, msg):
        """
        :param request: the client do supply the request but msg param only
        :param msg: any string variable
        :return:
        """
        return '%s (request from: ip:%s port:%s)' % (msg, request.client.host, request.client.port)


def lowercase(msg):
    return msg.lower()

# add the http root to serve static html files
httpRootPath = static.File("thirdparty/pyjs/output")

jsonHandler = JSONHandler()
#function added out side class definition
jsonHandler.add_method('lowercase', lowercase)

#put the json handler resource to root
httpRootPath.putChild("test", jsonHandler)

serverSite = server.Site(httpRootPath)

# listen to available ips at port 1080
reactor.listenTCP(1080, serverSite)
print 'open the link in the browser: http://127.0.0.1:1080 , or launch pyjsPyclient.py for test '
reactor.run()
