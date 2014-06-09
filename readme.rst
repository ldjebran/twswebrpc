
Teamworks web rpc
=================

twswebrpc is a very simple web rpc client and web resource for twisted

Install
+++++++

.. code-block:: sh

    $ easy_install twswebrpc

or

.. code-block:: sh

    $ pip install twswebrpc

Play
++++

Create a simple echo rpc web server:

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

Playing with tests
++++++++++++++++++

Download the full package with git:

enter a folder on your computer and execute:

.. code-block:: sh

    $ git clone https://github.com/ldjebran/twswebrpc


or download the zip package https://github.com/ldjebran/twswebrpc/archive/master.zip
and unzip it in folder.

test pyjs compiled example:
^^^^^^^^^^^^^^^^^^^^^^^^^^^

for more information about pyjs please take a look at: `www.pyjs.org <http://www.pyjs.org>`_

go to folder twswebrpc/test and execute:

.. code-block:: sh

    $ python pyjsserver.py
    open the link in the browser: http://127.0.0.1:1080 , or launch pyjsPyclient.py for test

open the url http://127.0.0.1:1080 in the browser, and test.

or execute the test python file pyjsPyclient.py

.. code-block:: sh

    $ python pyjsPyclient.py
    >>>>>>>>>>>>> jsonrpc: Hello world
                 [call time:0.00783395767212 reaming calls: 4]
    >>>>>>>>>>>>> jsonrpc: dlrow olleH
                 [call time:0.0120148658752 reaming calls: 3]
    >>>>>>>>>>>>> jsonrpc: HELLO WORLD
                 [call time:0.0129890441895 reaming calls: 2]
    >>>>>>>>>>>>> jsonrpc: Hello world (request from: ip:127.0.0.1 port:56994)
                 [call time:0.013927936554 reaming calls: 1]
    ERROR >>>>>>> jsonrpc: [Failure instance: Traceback (failure with no frames): <class 'twswebrpc.client.ServerError'>: se
    rver Error: server error - JSONRPCError - method "nonexistant_method" does not exist.
    ]
                 [call time:0.0149619579315 reaming calls: 0]
    >>>>>>>>>>>>> jsonrpc: - finish

this mean methods 1,2,3,4 has passed successfully but the latest as expected failed as method does not exist on server

Play with other samples:
^^^^^^^^^^^^^^^^^^^^^^^^

play with the simple echo and add server simpleechoserver.py

and execute and review code in: simpleechoclient.py and simpleechoclient_tester.py

















