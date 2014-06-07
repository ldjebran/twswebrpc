/* start module: JSONRPCExample */
$pyjs['loaded_modules']['JSONRPCExample'] = function (__mod_name__) {
	if($pyjs['loaded_modules']['JSONRPCExample']['__was_initialized__']) return $pyjs['loaded_modules']['JSONRPCExample'];
	var $m = $pyjs['loaded_modules']['JSONRPCExample'];
	$m['__repr__'] = function() { return '<module: JSONRPCExample>'; };
	$m['__was_initialized__'] = true;
	if ((__mod_name__ === null) || (typeof __mod_name__ == 'undefined')) __mod_name__ = 'JSONRPCExample';
	$m['__name__'] = __mod_name__;


	$m['pyjd'] = $p['___import___']('pyjd', null);
	$m['RootPanel'] = $p['___import___']('pyjamas.ui.RootPanel.RootPanel', null, null, false);
	$m['TextArea'] = $p['___import___']('pyjamas.ui.TextArea.TextArea', null, null, false);
	$m['Label'] = $p['___import___']('pyjamas.ui.Label.Label', null, null, false);
	$m['Button'] = $p['___import___']('pyjamas.ui.Button.Button', null, null, false);
	$m['HTML'] = $p['___import___']('pyjamas.ui.HTML.HTML', null, null, false);
	$m['VerticalPanel'] = $p['___import___']('pyjamas.ui.VerticalPanel.VerticalPanel', null, null, false);
	$m['HorizontalPanel'] = $p['___import___']('pyjamas.ui.HorizontalPanel.HorizontalPanel', null, null, false);
	$m['ListBox'] = $p['___import___']('pyjamas.ui.ListBox.ListBox', null, null, false);
	$m['JSONProxy'] = $p['___import___']('pyjamas.JSONService.JSONProxy', null, null, false);
	$m['JSONRPCExample'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'JSONRPCExample';
		$method = $pyjs__bind_method2('onModuleLoad', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}
			var info,buttons,$iter1_nextval,$iter1_type,$iter1_iter,$add2,$add1,$iter1_array,method_panel,panel,method,$iter1_idx;
			self['TEXT_WAITING'] = 'Waiting for response...';
			self['TEXT_ERROR'] = 'Server Error';
			self['METHOD_ECHO'] = 'Echo';
			self['METHOD_REVERSE'] = 'Reverse';
			self['METHOD_UPPERCASE'] = 'UPPERCASE';
			self['METHOD_LOWERCASE'] = 'lowercase';
			self['METHOD_ECHO_WITH_CLIENT_INFO'] = 'Echo with client info';
			self['METHOD_NONEXISTANT'] = 'Non existant';
			self['methods'] = $p['list']([$p['getattr'](self, 'METHOD_ECHO'), $p['getattr'](self, 'METHOD_REVERSE'), $p['getattr'](self, 'METHOD_UPPERCASE'), $p['getattr'](self, 'METHOD_LOWERCASE'), $p['getattr'](self, 'METHOD_ECHO_WITH_CLIENT_INFO'), $p['getattr'](self, 'METHOD_NONEXISTANT')]);
			self['remote_py'] = (typeof EchoServicePython == "undefined"?$m['EchoServicePython']:EchoServicePython)();
			self['status'] = $m['Label']();
			self['text_area'] = $m['TextArea']();
			self['text_area']['setText']($p['__op_add']($add1='{\'Test\'} ["String"]\n\tTest Tab\nTest Newline\n\nafter newline\n',$add2='Literal String:\n{\'Test\'} [\\"String\\"]\n'));
			self['text_area']['setCharacterWidth'](80);
			self['text_area']['setVisibleLines'](8);
			self['method_list'] = $m['ListBox']();
			self['method_list']['setName']('hello');
			self['method_list']['setVisibleItemCount'](1);
			$iter1_iter = $p['getattr'](self, 'methods');
			$iter1_nextval=$p['__iter_prepare']($iter1_iter,false);
			while (typeof($p['__wrapped_next']($iter1_nextval)['$nextval']) != 'undefined') {
				method = $iter1_nextval['$nextval'];
				self['method_list']['addItem'](method);
			}
			self['method_list']['setSelectedIndex'](0);
			method_panel = $m['HorizontalPanel']();
			method_panel['add']($m['HTML']('Remote string method to call: '));
			method_panel['add']($p['getattr'](self, 'method_list'));
			method_panel['setSpacing'](8);
			self['button_py'] = $m['Button']('Send to Python Service', self);
			buttons = $m['HorizontalPanel']();
			buttons['add']($p['getattr'](self, 'button_py'));
			buttons['setSpacing'](8);
			info = '<h2>JSON-RPC Example</h2>\n        <p>This example demonstrates the calling of server services with\n           <a href="http://json-rpc.org/">JSON-RPC</a>.\n        </p>\n        <p>Enter some text below, and press a button to send the text\n           to an Echo service on your server. An echo service simply sends the exact same text back that it receives.\n           </p>';
			panel = $m['VerticalPanel']();
			panel['add']($m['HTML'](info));
			panel['add']($p['getattr'](self, 'text_area'));
			panel['add'](method_panel);
			panel['add'](buttons);
			panel['add']($p['getattr'](self, 'status'));
			$m['RootPanel']()['add'](panel);
			return null;
		}
	, 1, [null,null,['self']]);
		$cls_definition['onModuleLoad'] = $method;
		$method = $pyjs__bind_method2('onClick', function(sender) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				sender = arguments[1];
			}
			var id,text,method;
			self['status']['setText']($p['getattr'](self, 'TEXT_WAITING'));
			method = $p['getattr'](self, 'methods')['__getitem__'](self['method_list']['getSelectedIndex']());
			text = self['text_area']['getText']();
			if ($p['bool']($p['op_eq'](sender, $p['getattr'](self, 'button_py')))) {
				if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_ECHO')))) {
					id = self['remote_py']['echo'](text, self);
				}
				else if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_REVERSE')))) {
					id = self['remote_py']['reverse'](text, self);
				}
				else if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_UPPERCASE')))) {
					id = self['remote_py']['uppercase'](text, self);
				}
				else if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_LOWERCASE')))) {
					id = self['remote_py']['lowercase'](text, self);
				}
				else if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_ECHO_WITH_CLIENT_INFO')))) {
					id = self['remote_py']['echo_client_info'](text, self);
				}
				else if ($p['bool']($p['op_eq'](method, $p['getattr'](self, 'METHOD_NONEXISTANT')))) {
					id = self['remote_py']['nonexistant'](text, self);
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['sender']]);
		$cls_definition['onClick'] = $method;
		$method = $pyjs__bind_method2('onRemoteResponse', function(response, request_info) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				response = arguments[1];
				request_info = arguments[2];
			}

			self['status']['setText'](response);
			return null;
		}
	, 1, [null,null,['self'],['response'],['request_info']]);
		$cls_definition['onRemoteResponse'] = $method;
		$method = $pyjs__bind_method2('onRemoteError', function(code, errobj, request_info) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				code = arguments[1];
				errobj = arguments[2];
				request_info = arguments[3];
			}
			var message;
			message = errobj['__getitem__']('message');
			if ($p['bool'](!$p['op_eq'](code, 0))) {
				self['status']['setText']($p['sprintf']('HTTP error %d: %s', $p['tuple']([code, message])));
			}
			else {
				code = errobj['__getitem__']('code');
				self['status']['setText']($p['sprintf']('JSONRPC Error %s: %s', $p['tuple']([code, message])));
			}
			return null;
		}
	, 1, [null,null,['self'],['code'],['errobj'],['request_info']]);
		$cls_definition['onRemoteError'] = $method;
		var $bases = new Array(pyjslib['object']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('JSONRPCExample', $p['tuple']($bases), $data);
	})();
	$m['EchoServicePython'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'JSONRPCExample';
		$method = $pyjs__bind_method2('__init__', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			$m['JSONProxy']['__init__'](self, 'test', $p['list'](['echo', 'reverse', 'uppercase', 'lowercase', 'echo_client_info', 'nonexistant']));
			return null;
		}
	, 1, [null,null,['self']]);
		$cls_definition['__init__'] = $method;
		var $bases = new Array($m['JSONProxy']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('EchoServicePython', $p['tuple']($bases), $data);
	})();
	if ($p['bool']($p['op_eq']((typeof __name__ == "undefined"?$m['__name__']:__name__), '__main__'))) {
		$m['pyjd']['setup']('http://127.0.0.1/examples/jsonrpc/public/JSONRPCExample.html');
		$m['app'] = $m['JSONRPCExample']();
		$m['app']['onModuleLoad']();
		$m['pyjd']['run']();
	}
	return this;
}; /* end JSONRPCExample */


/* end module: JSONRPCExample */


/*
PYJS_DEPS: ['pyjd', 'pyjamas.ui.RootPanel.RootPanel', 'pyjamas', 'pyjamas.ui', 'pyjamas.ui.RootPanel', 'pyjamas.ui.TextArea.TextArea', 'pyjamas.ui.TextArea', 'pyjamas.ui.Label.Label', 'pyjamas.ui.Label', 'pyjamas.ui.Button.Button', 'pyjamas.ui.Button', 'pyjamas.ui.HTML.HTML', 'pyjamas.ui.HTML', 'pyjamas.ui.VerticalPanel.VerticalPanel', 'pyjamas.ui.VerticalPanel', 'pyjamas.ui.HorizontalPanel.HorizontalPanel', 'pyjamas.ui.HorizontalPanel', 'pyjamas.ui.ListBox.ListBox', 'pyjamas.ui.ListBox', 'pyjamas.JSONService.JSONProxy', 'pyjamas.JSONService']
*/
