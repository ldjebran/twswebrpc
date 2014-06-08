#!/usr/bin/env python2.7

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
