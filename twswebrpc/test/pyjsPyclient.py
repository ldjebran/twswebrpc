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

import time

from twswebrpc import JSONClient
from twisted.internet import reactor


def tryStop():
    global rpcClients

    finished = True

    for rpcclient in rpcClients:
        if rpcclient.callsCounter > 0:
            finished = False

    if finished:
        reactor.stop()


def startClient(rpcClient):

    global startTime

    def success(response):
        print '>>>>>>>>>>>>> %s:' % rpcClient.protocolName, response
        print '             [call time:%s reaming calls: %s]' % (time.time() - startTime, rpcClient.callsCounter)
        if rpcClient.callsCounter == 0:
            print '>>>>>>>>>>>>> %s: - finish' % rpcClient.protocolName

        tryStop()

    def error(response):
        print 'ERROR >>>>>>> %s:' % rpcClient.protocolName, response
        print '             [call time:%s reaming calls: %s]' % (time.time() - startTime, rpcClient.callsCounter)

        if rpcClient.callsCounter == 0:
            print '>>>>>>>>>>>>> %s: - finish' % rpcClient.protocolName

        tryStop()

    methods = ['echo', 'reverse', 'uppercase', 'echo_client_info', 'nonexistant_method']

    for method in methods:
        #toSend = 'test from:%s method:%s' % (client.protocolName, method)
        toSend = 'Hello world'
        d = rpcClient.callRemote(method, toSend)
        d.addCallback(success)
        d.addErrback(error)

rpcClients = list()
rpcClients.append(JSONClient('http://127.0.0.1:1080/test'))

startTime = time.time()

for client in rpcClients:
    startClient(client)

reactor.run()
