/* start module: pyjamas.JSONService */
$pyjs['loaded_modules']['pyjamas.JSONService'] = function (__mod_name__) {
	if($pyjs['loaded_modules']['pyjamas.JSONService']['__was_initialized__']) return $pyjs['loaded_modules']['pyjamas.JSONService'];
	if(typeof $pyjs['loaded_modules']['pyjamas'] == 'undefined' || !$pyjs['loaded_modules']['pyjamas']['__was_initialized__']) $p['___import___']('pyjamas', null);
	var $m = $pyjs['loaded_modules']['pyjamas.JSONService'];
	$m['__repr__'] = function() { return '<module: pyjamas.JSONService>'; };
	$m['__was_initialized__'] = true;
	if ((__mod_name__ === null) || (typeof __mod_name__ == 'undefined')) __mod_name__ = 'pyjamas.JSONService';
	$m['__name__'] = __mod_name__;
	$pyjs['loaded_modules']['pyjamas']['JSONService'] = $pyjs['loaded_modules']['pyjamas.JSONService'];
	var $pyjs_try_err;

	$m['sys'] = $p['___import___']('sys', 'pyjamas');
	$m['HTTPRequest'] = $p['___import___']('HTTPRequest.HTTPRequest', 'pyjamas', null, false);
	try {
		$m['dumps'] = $p['___import___']('json.dumps', 'pyjamas', null, false);
		$m['loads'] = $p['___import___']('json.loads', 'pyjamas', null, false);
	} catch($pyjs_try_err) {
		var $pyjs_try_err_name = (typeof $pyjs_try_err['__name__'] == 'undefined' ? $pyjs_try_err['name'] : $pyjs_try_err['__name__'] );
		$pyjs['__last_exception__'] = {'error': $pyjs_try_err, 'module': $m};
		if (($pyjs_try_err_name == $p['ImportError']['__name__'])||$p['_isinstance']($pyjs_try_err,$p['ImportError'])) {
			$m['dumps'] = $p['___import___']('simplejson.dumps', 'pyjamas', null, false);
			$m['loads'] = $p['___import___']('simplejson.loads', 'pyjamas', null, false);
		} else { $pyjs['__active_exception_stack__'] = $pyjs['__last_exception_stack__']; $pyjs['__last_exception_stack__'] = null; throw $pyjs_try_err; }
	}
	$m['JSONServiceError'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		var $bases = new Array($p['Exception']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONServiceError', $p['tuple']($bases), $data);
	})();
	$m['__requestID'] = 0;
	$m['__requestIDPrefix'] = 'ID';
	$m['__lastRequestID'] = null;
	$m['nextRequestID'] = function() {
		var $add3,$add2,$add1,$add4,id;
		$m['__requestID'] = $p['__op_add']($add1=$m['__requestID'],$add2=1);
		id = $p['sprintf']('%s%s', $p['tuple']([$m['__requestIDPrefix'], $m['__requestID']]));
		if ($p['bool']($p['op_eq']($m['__lastRequestID'], id))) {
			$m['__requestIDPrefix'] = $p['__op_add']($add3=$m['__requestIDPrefix'],$add4='_');
			$m['__requestID'] = 0;
			id = $p['sprintf']('%s%s', $p['tuple']([$m['__requestIDPrefix'], $m['__requestID']]));
		}
		$m['__lastRequestID'] = id;
		return id;
	};
	$m['nextRequestID']['__name__'] = 'nextRequestID';

	$m['nextRequestID']['__bind_type__'] = 0;
	$m['nextRequestID']['__args__'] = [null,null];
	$m['JSONService'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		$cls_definition['content_type'] = 'application/json-rpc';
		$cls_definition['accept'] = 'application/json-rpc';
		$method = $pyjs__bind_method2('__init__', function(url, handler, headers) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				url = arguments[1];
				handler = arguments[2];
				headers = arguments[3];
			}
			if (typeof handler == 'undefined') handler=arguments['callee']['__args__'][4][1];
			if (typeof headers == 'undefined') headers=arguments['callee']['__args__'][5][1];

			self['url'] = url;
			self['handler'] = handler;
			self['headers'] = ($p['bool']((headers !== null))? (headers) : ($p['dict']([])));
			if ($p['bool'](!$p['bool'](self['headers']['get']('Accept')))) {
				$p['getattr'](self, 'headers')['__setitem__']('Accept', $p['getattr'](self, 'accept'));
			}
			return null;
		}
	, 1, [null,null,['self'],['url'],['handler', null],['headers', null]]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('callMethod', function(method, params, handler) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				method = arguments[1];
				params = arguments[2];
				handler = arguments[3];
			}
			if (typeof handler == 'undefined') handler=arguments['callee']['__args__'][5][1];

			if ($p['bool']((handler === null))) {
				handler = $p['getattr'](self, 'handler');
			}
			if ($p['bool']((handler === null))) {
				return self['sendNotify'](method, params);
			}
			else {
				return self['sendRequest'](method, params, handler);
			}
			return null;
		}
	, 1, [null,null,['self'],['method'],['params'],['handler', null]]);
		$cls_definition['callMethod'] = $method;
		$method = $pyjs__bind_method2('onCompletion', function(response) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				response = arguments[1];
			}

 			return null;
		}
	, 1, [null,null,['self'],['response']]);
		$cls_definition['onCompletion'] = $method;
		$method = $pyjs__bind_method2('sendNotify', function(method, params) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				method = arguments[1];
				params = arguments[2];
			}
			var msg,msg_data;
			msg = $p['dict']([['jsonrpc', '2.0'], ['version', '1.1'], ['method', method], ['params', params]]);
			msg_data = $m['dumps'](msg);
			if ($p['bool'](!$p['bool']($m['HTTPRequest']()['asyncPost']($p['getattr'](self, 'url'), msg_data, self, false, $p['getattr'](self, 'content_type'), $p['getattr'](self, 'headers'))))) {
				return (typeof ($usub1=1)=='number'?
					-$usub1:
					$p['op_usub']($usub1));
			}
			return 1;
		}
	, 1, [null,null,['self'],['method'],['params']]);
		$cls_definition['sendNotify'] = $method;
		$method = $pyjs__bind_method2('sendRequest', function(method, params, handler) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				method = arguments[1];
				params = arguments[2];
				handler = arguments[3];
			}
			var id,msg_data,msg,request_info;
			id = $m['nextRequestID']();
			msg = $p['dict']([['jsonrpc', '2.0'], ['id', id], ['method', method], ['params', params]]);
			msg_data = $m['dumps'](msg);
			request_info = (typeof JSONRequestInfo == "undefined"?$m['JSONRequestInfo']:JSONRequestInfo)(id, method, handler);
			if ($p['bool'](!$p['bool']($m['HTTPRequest']()['asyncPost']($p['getattr'](self, 'url'), msg_data, (typeof JSONResponseTextHandler == "undefined"?$m['JSONResponseTextHandler']:JSONResponseTextHandler)(request_info), false, $p['getattr'](self, 'content_type'), $p['getattr'](self, 'headers'))))) {
				return (typeof ($usub2=1)=='number'?
					-$usub2:
					$p['op_usub']($usub2));
			}
			return id;
		}
	, 1, [null,null,['self'],['method'],['params'],['handler']]);
		$cls_definition['sendRequest'] = $method;
		var $bases = new Array($p['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONService', $p['tuple']($bases), $data);
	})();
	$m['JSONRequestInfo'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		$method = $pyjs__bind_method2('__init__', function(id, method, handler) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				id = arguments[1];
				method = arguments[2];
				handler = arguments[3];
			}

			self['id'] = id;
			self['method'] = method;
			self['handler'] = handler;
			return null;
		}
	, 1, [null,null,['self'],['id'],['method'],['handler']]);
		$cls_definition['__init__'] = $method;
		var $bases = new Array($p['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONRequestInfo', $p['tuple']($bases), $data);
	})();
	$m['create_object'] = function(items) {
		var clsname,modulename,$iter1_nextval,$iter1_type,vars,k,kls,v,$iter1_iter,$add6,$iter1_array,$add5,dot,$iter1_idx;
		clsname = items['pop']('__jsonclass__', null);
		if ($p['bool'](!$p['bool'](clsname))) {
			return items;
		}
		clsname = clsname['__getitem__'](0);
		dot = clsname['rfind']('.');
		modulename = $p['__getslice'](clsname, 0, dot);
		clsname = $p['__getslice'](clsname, $p['__op_add']($add5=dot,$add6=1), null);
		vars = $p['dict']([]);
		kls = vars['__getitem__']('kls');
		vars = $p['dict']([]);
		$iter1_iter = items['items']();
		$iter1_nextval=$p['__iter_prepare']($iter1_iter,false);
		while (typeof($p['__wrapped_next']($iter1_nextval)['$nextval']) != 'undefined') {
			var $tupleassign1 = $p['__ass_unpack']($iter1_nextval['$nextval'], 2, null);
			k = $tupleassign1[0];
			v = $tupleassign1[1];
			vars['__setitem__']($p['str'](k), v);
		}
		return $pyjs_kwargs_call(null, kls, null, vars, [{}]);
	};
	$m['create_object']['__name__'] = 'create_object';

	$m['create_object']['__bind_type__'] = 0;
	$m['create_object']['__args__'] = [null,null,['items']];
	$m['_decode_response'] = function(json_str) {

		return $pyjs_kwargs_call(null, $m['loads'], null, null, [{'object_hook':$m['create_object']}, json_str]);
	};
	$m['_decode_response']['__name__'] = '_decode_response';

	$m['_decode_response']['__bind_type__'] = 0;
	$m['_decode_response']['__args__'] = [null,null,['json_str']];
	$m['JSONResponseTextHandler'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		$method = $pyjs__bind_method2('__init__', function(request) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				request = arguments[1];
			}

			self['request'] = request;
			return null;
		}
	, 1, [null,null,['self'],['request']]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('onCompletion', function(json_str) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				json_str = arguments[1];
			}
			var code,jsonrpc,$pyjs_try_err,error,message,data,response;
			try {
				response = $m['_decode_response'](json_str);
			} catch($pyjs_try_err) {
				var $pyjs_try_err_name = (typeof $pyjs_try_err['__name__'] == 'undefined' ? $pyjs_try_err['name'] : $pyjs_try_err['__name__'] );
				$pyjs['__last_exception__'] = {'error': $pyjs_try_err, 'module': $m};
				if (true) {
					error = $pyjs_kwargs_call(null, $p['dict'], null, null, [{'code':(typeof ($usub3=32700)=='number'?
						-$usub3:
						$p['op_usub']($usub3)), 'message':'Parse error while decoding response', 'data':null}]);
					self['request']['handler']['onRemoteError'](0, error, $p['getattr'](self, 'request'));
					return null;
				}
			}
			if ($p['bool'](!$p['bool'](response))) {
				error = $pyjs_kwargs_call(null, $p['dict'], null, null, [{'code':(typeof ($usub4=32603)=='number'?
					-$usub4:
					$p['op_usub']($usub4)), 'message':'Empty Response', 'data':null}]);
				self['request']['handler']['onRemoteError'](0, error, $p['getattr'](self, 'request'));
			}
			else if ($p['bool'](response['get']('error'))) {
				error = response['__getitem__']('error');
				jsonrpc = response['get']('jsonrpc');
				code = error['get']('code', 0);
				message = error['get']('message', error);
				data = error['get']('data');
				if ($p['bool'](!$p['bool'](jsonrpc))) {
					jsonrpc = response['get']('version', '1.0');
					if ($p['bool']($p['op_eq'](jsonrpc, '1.0'))) {
						message = error;
					}
					else {
						data = error['get']('error');
					}
				}
				error = $pyjs_kwargs_call(null, $p['dict'], null, null, [{'code':code, 'message':message, 'data':data}]);
				self['request']['handler']['onRemoteError'](0, error, $p['getattr'](self, 'request'));
			}
			else if ($p['bool'](response['__contains__']('result'))) {
				self['request']['handler']['onRemoteResponse'](response['__getitem__']('result'), $p['getattr'](self, 'request'));
			}
			else {
				error = $pyjs_kwargs_call(null, $p['dict'], null, null, [{'code':(typeof ($usub5=32603)=='number'?
					-$usub5:
					$p['op_usub']($usub5)), 'message':'No result or error in response', 'data':response}]);
				self['request']['handler']['onRemoteError'](0, error, $p['getattr'](self, 'request'));
			}
			return null;
		}
	, 1, [null,null,['self'],['json_str']]);
		$cls_definition['onCompletion'] = $method;
		$method = $pyjs__bind_method2('onError', function(error_str, error_code) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				error_str = arguments[1];
				error_code = arguments[2];
			}
			var error;
			error = $pyjs_kwargs_call(null, $p['dict'], null, null, [{'code':error_code, 'message':error_str, 'data':null}]);
			self['request']['handler']['onRemoteError'](error_code, error, $p['getattr'](self, 'request'));
			return null;
		}
	, 1, [null,null,['self'],['error_str'],['error_code']]);
		$cls_definition['onError'] = $method;
		var $bases = new Array($p['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONResponseTextHandler', $p['tuple']($bases), $data);
	})();
	$m['ServiceProxy'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		$method = $pyjs__bind_method2('__init__', function(serviceURL, serviceName, headers) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				serviceURL = arguments[1];
				serviceName = arguments[2];
				headers = arguments[3];
			}
			if (typeof serviceName == 'undefined') serviceName=arguments['callee']['__args__'][4][1];
			if (typeof headers == 'undefined') headers=arguments['callee']['__args__'][5][1];

			$pyjs_kwargs_call($m['JSONService'], '__init__', null, null, [{'headers':headers}, self, serviceURL]);
			self['__serviceName'] = serviceName;
			return null;
		}
	, 1, [null,null,['self'],['serviceURL'],['serviceName', null],['headers', null]]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('__call__', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
				var params = $p['tuple']($pyjs_array_slice['call'](arguments,0,arguments['length']-1));

				var kwargs = arguments['length'] >= 1 ? arguments[arguments['length']-1] : arguments[arguments['length']];
				if (kwargs === null || typeof kwargs != 'object' || kwargs['__name__'] != 'dict' || typeof kwargs['$pyjs_is_kwarg'] == 'undefined') {
					if (typeof kwargs != 'undefined') params['__array']['push'](kwargs);
					var kwargs = arguments[arguments['length']+1];
				} else {
					delete kwargs['$pyjs_is_kwarg'];
				}
			} else {
				var self = arguments[0];
				var params = $p['tuple']($pyjs_array_slice['call'](arguments,1,arguments['length']-1));

				var kwargs = arguments['length'] >= 2 ? arguments[arguments['length']-1] : arguments[arguments['length']];
				if (kwargs === null || typeof kwargs != 'object' || kwargs['__name__'] != 'dict' || typeof kwargs['$pyjs_is_kwarg'] == 'undefined') {
					if (typeof kwargs != 'undefined') params['__array']['push'](kwargs);
					kwargs = arguments[arguments['length']+1];
				} else {
					delete kwargs['$pyjs_is_kwarg'];
				}
			}
			if (typeof kwargs == 'undefined') {
				kwargs = $p['__empty_dict']();
				if (typeof self != 'undefined') {
					if (self !== null && typeof self['$pyjs_is_kwarg'] != 'undefined') {
						kwargs = self;
						self = arguments[1];
					}
				} else {
				}
			}
			var $and1,$and3,$and4,handler,$and2;
			if ($p['bool']($p['isinstance'](params, $p['tuple']))) {
				params = $p['list'](params);
			}
			if ($p['bool'](($p['bool']($and1=params)?$p['hasattr'](params['__getitem__'](0), 'onRemoteResponse'):$and1))) {
				handler = params['pop'](0);
			}
			else if ($p['bool'](($p['bool']($and3=params)?$p['hasattr'](params['__getitem__']((typeof ($usub6=1)=='number'?
				-$usub6:
				$p['op_usub']($usub6))), 'onRemoteResponse'):$and3))) {
				handler = params['pop']();
			}
			else {
				handler = null;
			}
			if ($p['bool'](kwargs)) {
				if ($p['bool'](params)) {
					if ($p['bool'](!$p['bool']($p['isinstance'](params, $p['dict'])))) {
						throw ($m['JSONServiceError']('Cannot mix positional and keyword arguments'));
					}
					params['update'](kwargs);
				}
				else {
					params = kwargs;
				}
			}
			if ($p['bool']((handler !== null))) {
				return $m['JSONService']['sendRequest'](self, $p['getattr'](self, '__serviceName'), params, handler);
			}
			else {
				return $m['JSONService']['sendNotify'](self, $p['getattr'](self, '__serviceName'), params);
			}
			return null;
		}
	, 1, ['params',['kwargs'],['self']]);
		$cls_definition['__call__'] = $method;
		var $bases = new Array($m['JSONService']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('ServiceProxy', $p['tuple']($bases), $data);
	})();
	$m['JSONProxy'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.JSONService';
		$method = $pyjs__bind_method2('__init__', function(url, methods, headers) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				url = arguments[1];
				methods = arguments[2];
				headers = arguments[3];
			}
			if (typeof methods == 'undefined') methods=arguments['callee']['__args__'][4][1];
			if (typeof headers == 'undefined') headers=arguments['callee']['__args__'][5][1];

			self['_serviceURL'] = url;
			self['methods'] = methods;
			self['headers'] = ($p['bool']((headers === null))? ($p['dict']([])) : (headers));
			$pyjs_kwargs_call($m['JSONService'], '__init__', null, null, [{'headers':$p['getattr'](self, 'headers')}, self, url]);
			self['_registerMethods'](methods);
			return null;
		}
	, 1, [null,null,['self'],['url'],['methods', null],['headers', null]]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('_registerMethods', function(methods) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				methods = arguments[1];
			}
			var $iter2_nextval,$iter2_type,$iter2_iter,$iter2_idx,method,$iter2_array;
			if ($p['bool'](methods)) {
				$iter2_iter = methods;
				$iter2_nextval=$p['__iter_prepare']($iter2_iter,false);
				while (typeof($p['__wrapped_next']($iter2_nextval)['$nextval']) != 'undefined') {
					method = $iter2_nextval['$nextval'];
					$p['setattr'](self, method, $p['getattr']($pyjs_kwargs_call(null, $m['ServiceProxy'], null, null, [{'headers':$p['getattr'](self, 'headers')}, $p['getattr'](self, '_serviceURL'), method]), '__call__'));
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['methods']]);
		$cls_definition['_registerMethods'] = $method;
		var $bases = new Array($m['JSONService']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONProxy', $p['tuple']($bases), $data);
	})();
	return this;
}; /* end pyjamas.JSONService */


/* end module: pyjamas.JSONService */


/*
PYJS_DEPS: ['sys', 'HTTPRequest.HTTPRequest', 'HTTPRequest', 'json.dumps', 'json', 'json.loads', 'simplejson.dumps', 'simplejson', 'simplejson.loads']
*/
