# !/usr/bin/env python2.7

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
    :param result is here for deferred that will supply it
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
    print '%s' % consoleRootName('server'), response


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

    # chain try stop reactor, so we can free the response function to call it
    stopDeferred = Deferred()
    stopDeferred.addBoth(tryStopReactor, rpc_client)

    # when results came back success or error, fire stopDeferred callBacks
    deferred.chainDeferred(stopDeferred)

    return deferred


# creating the rpc client with url 'http://127.0.0.1:1080'
simpleClient = JSONClient('http://127.0.0.1:1080')

# call echo
callRemote(simpleClient, 'echo', 'hollow world')

# call add
callRemote(simpleClient, 'add', 4, 3)

# passing a method that do not exist on server
callRemote(simpleClient, 'nonexistant')

# passing a method with wrong arguments
callRemote(simpleClient, 'add', 4, 'i am a wrong argument')

# passing a method with less arguments
callRemote(simpleClient, 'add', 4)

print 'reactor >>> starting ...'
reactor.run()
print 'reactor >>> stopped'
