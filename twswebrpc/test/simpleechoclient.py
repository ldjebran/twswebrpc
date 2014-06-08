#!/usr/bin/env python2.7

from twswebrpc import JSONClient
from twisted.internet import reactor


def tryStopReactor():

    global simpleClient

    finished = True
    if simpleClient.callsCounter > 0:
            finished = False

    if finished:
        reactor.stop()


def onResponseSuccess(response):
    print 'server response> %s' % response
    tryStopReactor()


def onResponseError(response):
    print 'error response> %s' % response
    tryStopReactor()


simpleClient = JSONClient('http://127.0.0.1:1080')

deferred = simpleClient.callRemote('echo', 'hollow world')
deferred.addCallback(onResponseSuccess)
deferred.addErrback(onResponseError)

deferred = simpleClient.callRemote('add', 4, 3)
deferred.addCallback(onResponseSuccess)
deferred.addErrback(onResponseError)

reactor.run()