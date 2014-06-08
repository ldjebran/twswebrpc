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

"""
a very simple json echo server
"""

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
