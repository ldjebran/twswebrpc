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