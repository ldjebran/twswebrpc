
Teamworks web rpc
=================

twswebrpc is a very simple web rpc client, but very stable

Install
+++++++

.. code-block:: sh

    $ easy_install twswebrpc


Play
++++

Create a simple echo web server:

.. code-block:: python

    from twswebrpc import JSONResource

    from twisted.internet import reactor
    from twisted.web import server


    def serve_echo(value):
        return value

    jsonServerResource = JSONResource()
    jsonServerResource.add_method('echo', serve_echo)

    serverSite = server.Site(jsonServerResource)

    # listen to available ips at port 1080
    reactor.listenTCP(1080, serverSite)
    reactor.run()

create a simple json rpc web client:

.. code-block:: python

    from twswebrpc import JSONClient
    from twisted.internet import reactor


    def onResponseSuccess(response):
        print 'server response> %s' % response
        reactor.stop()


    def onResponseError(response):
        print 'error response> %s' % response
        reactor.stop()


    simpleClient = JSONClient('http://127.0.0.1:1080')

    deferred = simpleClient.callRemote('echo', 'hollow world')
    deferred.addCallback(onResponseSuccess)
    deferred.addErrback(onResponseError)
    reactor.run()

