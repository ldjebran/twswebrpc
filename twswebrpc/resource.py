
from twisted.web.resource import Resource
from twisted.web import server
from twisted.internet import defer
from twisted.web.server import GzipEncoderFactory

from encoder import IEncoder, JSONEncoder, JellyEncoder


"""
# a very simple echo web server

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
"""


class JSONResource(Resource):

    protocolName = 'jsonrpc'
    protocolVersion = '1.1'
    protocolContentType = 'text/json'
    protocolErrorName = 'JSONRPCError'

    isLeaf = True

    def __init__(self, logger=None):
        Resource.__init__(self)
        self._methods = {}
        self._methods_with_requests = []
        self.logger = logger
        self.initMethods()

        # by default do not use compression
        self._gzipEncoderFactory = None

        self.encoder = self.get_encoder()
        if not IEncoder.providedBy(self.encoder):
            raise Exception('no encoder available or encoder does not provide IEncoder')

    def getCompressLevel(self):
        return self._gzipEncoderFactory.compressLevel

    def setCompressLevel(self, value):
        self._gzipEncoderFactory.compressLevel = value

    compressLevel = property(getCompressLevel, setCompressLevel)

    def getUseCompression(self):
        if self._gzipEncoderFactory:
            return True

        return False

    def setUseCompression(self, value):
        if value:
            self._gzipEncoderFactory = GzipEncoderFactory()
        else:
            self._gzipEncoderFactory = None

    useCompression = property(getUseCompression, setUseCompression)

    def get_encoder(self):
        return JSONEncoder()

    def initMethods(self):
        """
        override this to auto register your methods
        make use of self.add_method(name,method)
        for example:
        self.add_method('echo',self.echo)
        """
        pass

    def add_method(self, name, method, with_request=False):
        """
        This can called to register class methods or external function to be called by rpc clients
        :param name string name that clients will call to reach this method
        :param method a method or function that will be called when clients call name method

        """
        #override any name that already here
        self._methods[name] = method
        if with_request:
            if name not in self._methods_with_requests:
                self._methods_with_requests.append(name)
        else:
            # if i am updating remove
            if name in self._methods_with_requests:
                self._methods_with_requests.remove(name)

    def remove_method(self, name):
        if name in self._methods:
            del self._methods[name]

        if name in self._methods_with_requests:
            self._methods_with_requests.remove(name)

    def list_methods(self):
        return list(self._methods)

    def has_method(self, name):
        return name in self._methods

    def get_method(self, name):
        if name in self._methods:
            return self._methods[name]

        return None

    def requestAborted(self, err, deferred, request):
        """
        The client has disconnected while call is running if more cleanup needed,
        inherit this method
        """
        deferred.cancel()

        # log this if possible
        if self.logger:
            self.logger('call cancelled: %s:%s > %s ' %
                        (request.client.host, request.client.port, err.getErrorMessage()))

    def response(self, callID, result):
        return self.encoder.encode(dict(version=self.protocolVersion, id=callID, result=result, error=None))

    def error(self, callID, code, message):
        return self.encoder.encode(dict(id=callID,
                                        version=self.protocolVersion,
                                        error=dict(name=self.protocolErrorName,
                                                   code=code,
                                                   message=message),
                                        result=None)
                                   )

    def render(self, request):
        request.content.seek(0, 0)
        content = request.content.read()

        d = defer.maybeDeferred(self.process, content, request)

        request.notifyFinish().addErrback(self.requestAborted, d, request)
        d.addCallback(self.processSuccess, request)
        d.addErrback(self.processError, request)

        return server.NOT_DONE_YET

    def process(self, data, request):

        decodedData = self.encoder.decode(data)

        if not isinstance(decodedData, dict):
            return self.error(0, 100, 'inappropriate protocol')

        callID = decodedData.get('id', 0)
        methodName = decodedData.get('method', None)
        params = decodedData.get('params', [])

        if not isinstance(params, (list, tuple)):
            return self.error(callID, 100, 'protocol params must be list or tuple')

        method = self.get_method(methodName)

        if method:
            if methodName in self._methods_with_requests:
                d = defer.maybeDeferred(method, request, *params)
            else:
                d = defer.maybeDeferred(method, *params)

            d.addCallback(self._execMethodSuccess, callID)
            d.addErrback(self._execMethodError, callID)
            return d
        else:
            return self.error(callID, 100, 'method "%s" does not exist' % methodName)

    def processSuccess(self, result, request):
        if not request._disconnected:
            request.setHeader("content-type", self.protocolContentType)
            if self._gzipEncoderFactory:
                gzipEncoder = self._gzipEncoderFactory.encoderForRequest(request)
            else:
                gzipEncoder = None

            if gzipEncoder:
                request.write(gzipEncoder.encode(result))
                request.write(gzipEncoder.finish())

            else:
                request.setHeader("content-length", str(len(result)))
                request.write(result)

            request.finish()

    def processError(self, failure, request):
        """
        this can be due only if the protocol sent here is not json
        for example when a user access here by browser
        try to respond in json format only
        except when it is disconnected
        """
        if not request._disconnected:
            result = self.error(None, 100, failure.getErrorMessage())
            request.setHeader("content-type", self.protocolContentType)
            request.setHeader("content-length", str(len(result)))
            request.write(result)
            request.finish()

    def _execMethodSuccess(self, result, callID):
        return self.response(callID, result)

    def _execMethodError(self, failure, callID):
        return self.error(callID, 100, failure.getErrorMessage())


class JellyResource(JSONResource):

    protocolName = 'jellyrpc'
    protocolVersion = '1.1'
    protocolContentType = 'text/jelly'
    protocolErrorName = 'JELLYRPCError'

    def get_encoder(self):
        return JellyEncoder()
