#!/usr/bin/env python2.7

# a very simple json echo server

from twswebrpc import JSONResource

from twisted.internet import reactor
from twisted.web import server


def serve_echo(value):
    return value


def serve_add(a, b):
    return a + b


jsonServerResource = JSONResource()
jsonServerResource.add_method('echo', serve_echo)
jsonServerResource.add_method('add', serve_add)

serverSite = server.Site(jsonServerResource)

# listen to available ips at port 1080
reactor.listenTCP(1080, serverSite)
print 'launch simpleechoclient.py or simpleechoclient_tester.py for test '
reactor.run()
