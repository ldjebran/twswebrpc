/* start module: pyjamas.ui.ListBox */
$pyjs['loaded_modules']['pyjamas.ui.ListBox'] = function (__mod_name__) {
	if($pyjs['loaded_modules']['pyjamas.ui.ListBox']['__was_initialized__']) return $pyjs['loaded_modules']['pyjamas.ui.ListBox'];
	if(typeof $pyjs['loaded_modules']['pyjamas.ui'] == 'undefined' || !$pyjs['loaded_modules']['pyjamas.ui']['__was_initialized__']) $p['___import___']('pyjamas.ui', null);
	var $m = $pyjs['loaded_modules']['pyjamas.ui.ListBox'];
	$m['__repr__'] = function() { return '<module: pyjamas.ui.ListBox>'; };
	$m['__was_initialized__'] = true;
	if ((__mod_name__ === null) || (typeof __mod_name__ == 'undefined')) __mod_name__ = 'pyjamas.ui.ListBox';
	$m['__name__'] = __mod_name__;
	$pyjs['loaded_modules']['pyjamas.ui']['ListBox'] = $pyjs['loaded_modules']['pyjamas.ui.ListBox'];


	$m['DOM'] = $p['___import___']('pyjamas.DOM', 'pyjamas.ui', null, false);
	$m['Factory'] = $p['___import___']('pyjamas.Factory', 'pyjamas.ui', null, false);
	$m['FocusWidget'] = $p['___import___']('pyjamas.ui.FocusWidget.FocusWidget', 'pyjamas.ui', null, false);
	$m['ChangeHandler'] = $p['___import___']('pyjamas.ui.ChangeListener.ChangeHandler', 'pyjamas.ui', null, false);
	$m['Event'] = $p['___import___']('pyjamas.ui.Event', 'pyjamas.ui', null, false);
	$m['ListBox'] = (function(){
		var $cls_definition = new Object();
		var $method;
		$cls_definition['__module__'] = 'pyjamas.ui.ListBox';
		$cls_definition['_props'] = $p['list']([$p['tuple'](['visible', 'Visible Count', 'VisibleItemCount', null]), $p['tuple'](['name', 'Name', 'Name', null]), $p['tuple'](['selectedIndex', 'Selected Index', 'SelectedIndex', null]), $p['tuple'](['multiple', 'Multiple Select', 'MultiplSelect', null])]);
		$method = $pyjs__bind_method2('__init__', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
				var kwargs = arguments['length'] >= 1 ? arguments[arguments['length']-1] : arguments[arguments['length']];
				if (kwargs === null || typeof kwargs != 'object' || kwargs['__name__'] != 'dict' || typeof kwargs['$pyjs_is_kwarg'] == 'undefined') {
					var kwargs = arguments[arguments['length']+1];
				} else {
					delete kwargs['$pyjs_is_kwarg'];
				}
			} else {
				var self = arguments[0];
				var kwargs = arguments['length'] >= 2 ? arguments[arguments['length']-1] : arguments[arguments['length']];
				if (kwargs === null || typeof kwargs != 'object' || kwargs['__name__'] != 'dict' || typeof kwargs['$pyjs_is_kwarg'] == 'undefined') {
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
			var element,$or2,$or1;
			if ($p['bool'](!$p['bool'](kwargs['has_key']('StyleName')))) {
				kwargs['__setitem__']('StyleName', 'gwt-ListBox');
			}
			self['INSERT_AT_END'] = (typeof ($usub1=1)=='number'?
				-$usub1:
				$p['op_usub']($usub1));
			element = ($p['bool']($or1=kwargs['pop']('Element', null))?$or1:$m['DOM']['createSelect']());
			$pyjs_kwargs_call($m['FocusWidget'], '__init__', null, kwargs, [{}, self, element]);
			$m['ChangeHandler']['__init__'](self);
			return null;
		}
	, 1, [null,['kwargs'],['self']]);
		$cls_definition['__init__'] = $method;
		$method = $pyjs__bind_method2('_getProps', function() {
    var self = this['prototype'];
			var $add2,$add1;
			return $p['__op_add']($add1=$m['FocusWidget']['_getProps'](),$add2=$p['getattr'](self, '_props'));
		}
	, 2, [null,null,['self']]);
		$cls_definition['_getProps'] = $method;
		$method = $pyjs__bind_method2('_setWeirdProps', function(props, builderstate) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				props = arguments[1];
				builderstate = arguments[2];
			}
			var $iter2_nextval,$iter1_nextval,$iter1_type,$iter2_iter,items,v,$iter1_iter,$iter2_idx,$iter1_array,$iter2_type,k,$iter2_array,$iter1_idx;
			items = $p['dict']([]);
			$iter1_iter = props['items']();
			$iter1_nextval=$p['__iter_prepare']($iter1_iter,false);
			while (typeof($p['__wrapped_next']($iter1_nextval)['$nextval']) != 'undefined') {
				var $tupleassign1 = $p['__ass_unpack']($iter1_nextval['$nextval'], 2, null);
				k = $tupleassign1[0];
				v = $tupleassign1[1];
				if ($p['bool'](!$p['bool']($p['isinstance'](k, $p['float_int'])))) {
					continue;
				}
				items['__setitem__']($p['float_int'](k), v);
			}
			items = items['items']();
			items['sort']();
			$iter2_iter = items;
			$iter2_nextval=$p['__iter_prepare']($iter2_iter,false);
			while (typeof($p['__wrapped_next']($iter2_nextval)['$nextval']) != 'undefined') {
				var $tupleassign2 = $p['__ass_unpack']($iter2_nextval['$nextval'], 2, null);
				k = $tupleassign2[0];
				v = $tupleassign2[1];
				$pyjs_kwargs_call(self, 'addItem', v, null, [{}]);
			}
			return null;
		}
	, 1, [null,null,['self'],['props'],['builderstate']]);
		$cls_definition['_setWeirdProps'] = $method;
		$method = $pyjs__bind_method2('addItem', function(item, value) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				item = arguments[1];
				value = arguments[2];
			}
			if (typeof value == 'undefined') value=arguments['callee']['__args__'][4][1];

			self['insertItem'](item, value, $p['getattr'](self, 'INSERT_AT_END'));
			return null;
		}
	, 1, [null,null,['self'],['item'],['value', null]]);
		$cls_definition['addItem'] = $method;
		$method = $pyjs__bind_method2('clear', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}
			var h;
			h = self['getElement']();
			while ($p['bool'](($p['cmp']($m['DOM']['getChildCount'](h), 0) == 1))) {
				$m['DOM']['removeChild'](h, $m['DOM']['getChild'](h, 0));
			}
			return null;
		}
	, 1, [null,null,['self']]);
		$cls_definition['clear'] = $method;
		$method = $pyjs__bind_method2('getItemCount', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $m['DOM']['getChildCount'](self['getElement']());
		}
	, 1, [null,null,['self']]);
		$cls_definition['getItemCount'] = $method;
		$method = $pyjs__bind_method2('getItemText', function(index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
			}
			var child;
			child = $m['DOM']['getChild'](self['getElement'](), index);
			return $m['DOM']['getInnerText'](child);
		}
	, 1, [null,null,['self'],['index']]);
		$cls_definition['getItemText'] = $method;
		$method = $pyjs__bind_method2('getName', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $m['DOM']['getAttribute'](self['getElement'](), 'name');
		}
	, 1, [null,null,['self']]);
		$cls_definition['getName'] = $method;
		$method = $pyjs__bind_method2('getSelectedIndex', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $m['DOM']['getIntAttribute'](self['getElement'](), 'selectedIndex');
		}
	, 1, [null,null,['self']]);
		$cls_definition['getSelectedIndex'] = $method;
		$method = $pyjs__bind_method2('getValue', function(index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
			}
			var option;
			self['checkIndex'](index);
			option = $m['DOM']['getChild'](self['getElement'](), index);
			return $m['DOM']['getAttribute'](option, 'value');
		}
	, 1, [null,null,['self'],['index']]);
		$cls_definition['getValue'] = $method;
		$method = $pyjs__bind_method2('getVisibleItemCount', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $m['DOM']['getIntAttribute'](self['getElement'](), 'size');
		}
	, 1, [null,null,['self']]);
		$cls_definition['getVisibleItemCount'] = $method;
		$method = $pyjs__bind_method2('insertItem', function(item, value, index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				item = arguments[1];
				value = arguments[2];
				index = arguments[3];
			}
			if (typeof index == 'undefined') index=arguments['callee']['__args__'][5][1];

			if ($p['bool']((index === null))) {
				index = value;
				value = null;
			}
			$m['DOM']['insertListItem'](self['getElement'](), item, value, index);
			return null;
		}
	, 1, [null,null,['self'],['item'],['value'],['index', null]]);
		$cls_definition['insertItem'] = $method;
		$method = $pyjs__bind_method2('isItemSelected', function(index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
			}
			var option;
			self['checkIndex'](index);
			option = $m['DOM']['getChild'](self['getElement'](), index);
			return $m['DOM']['getBooleanAttribute'](option, 'selected');
		}
	, 1, [null,null,['self'],['index']]);
		$cls_definition['isItemSelected'] = $method;
		$method = $pyjs__bind_method2('removeItem', function(idx) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				idx = arguments[1];
			}
			var child;
			child = $m['DOM']['getChild'](self['getElement'](), idx);
			$m['DOM']['removeChild'](self['getElement'](), child);
			return null;
		}
	, 1, [null,null,['self'],['idx']]);
		$cls_definition['removeItem'] = $method;
		$method = $pyjs__bind_method2('setItemSelected', function(index, selected) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
				selected = arguments[2];
			}
			var option,$or3,$or4,$and1,$and2;
			self['checkIndex'](index);
			option = $m['DOM']['getChild'](self['getElement'](), index);
			$m['DOM']['setIntAttribute'](option, 'selected', ($p['bool']($or3=($p['bool']($and1=selected)?1:$and1))?$or3:0));
			return null;
		}
	, 1, [null,null,['self'],['index'],['selected']]);
		$cls_definition['setItemSelected'] = $method;
		$method = $pyjs__bind_method2('isMultipleSelect', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return self['getMultipleSelect']();
		}
	, 1, [null,null,['self']]);
		$cls_definition['isMultipleSelect'] = $method;
		$method = $pyjs__bind_method2('getMultipleSelect', function() {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
			}

			return $m['DOM']['getBooleanAttribute'](self['getElement'](), 'multiple');
		}
	, 1, [null,null,['self']]);
		$cls_definition['getMultipleSelect'] = $method;
		$method = $pyjs__bind_method2('setMultipleSelect', function(multiple) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				multiple = arguments[1];
			}

			$m['DOM']['setBooleanAttribute'](self['getElement'](), 'multiple', multiple);
			return null;
		}
	, 1, [null,null,['self'],['multiple']]);
		$cls_definition['setMultipleSelect'] = $method;
		$method = $pyjs__bind_method2('setName', function(name) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				name = arguments[1];
			}

			$m['DOM']['setAttribute'](self['getElement'](), 'name', name);
			return null;
		}
	, 1, [null,null,['self'],['name']]);
		$cls_definition['setName'] = $method;
		$method = $pyjs__bind_method2('setSelectedIndex', function(index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
			}

			$m['DOM']['setIntAttribute'](self['getElement'](), 'selectedIndex', index);
			return null;
		}
	, 1, [null,null,['self'],['index']]);
		$cls_definition['setSelectedIndex'] = $method;
		$method = $pyjs__bind_method2('selectValue', function(value) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				value = arguments[1];
			}
			var $iter3_idx,$iter3_type,n,$iter3_iter,$iter3_array,$iter3_nextval;
			$iter3_iter = $p['range'](self['getItemCount']());
			$iter3_nextval=$p['__iter_prepare']($iter3_iter,false);
			while (typeof($p['__wrapped_next']($iter3_nextval)['$nextval']) != 'undefined') {
				n = $iter3_nextval['$nextval'];
				if ($p['bool']($p['op_eq'](self['getValue'](n), value))) {
					self['setSelectedIndex'](n);
					return n;
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['value']]);
		$cls_definition['selectValue'] = $method;
		$method = $pyjs__bind_method2('selectItem', function(item) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				item = arguments[1];
			}
			var $iter4_nextval,n,$iter4_idx,$iter4_type,$iter4_array,$iter4_iter;
			$iter4_iter = $p['range'](self['getItemCount']());
			$iter4_nextval=$p['__iter_prepare']($iter4_iter,false);
			while (typeof($p['__wrapped_next']($iter4_nextval)['$nextval']) != 'undefined') {
				n = $iter4_nextval['$nextval'];
				if ($p['bool']($p['op_eq'](self['getItemText'](n), item))) {
					self['setSelectedIndex'](n);
					return n;
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['item']]);
		$cls_definition['selectItem'] = $method;
		$method = $pyjs__bind_method2('setItemText', function(index, text) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
				text = arguments[2];
			}

			self['checkIndex'](index);
			if ($p['bool']((text === null))) {
				console['error']('Cannot set an option to have null text');
				return null;
			}
			$m['DOM']['setOptionText'](self['getElement'](), text, index);
			return null;
		}
	, 1, [null,null,['self'],['index'],['text']]);
		$cls_definition['setItemText'] = $method;
		$method = $pyjs__bind_method2('setValue', function(index, value) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
				value = arguments[2];
			}
			var option;
			self['checkIndex'](index);
			option = $m['DOM']['getChild'](self['getElement'](), index);
			$m['DOM']['setAttribute'](option, 'value', value);
			return null;
		}
	, 1, [null,null,['self'],['index'],['value']]);
		$cls_definition['setValue'] = $method;
		$method = $pyjs__bind_method2('setVisibleItemCount', function(visibleItems) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				visibleItems = arguments[1];
			}

			$m['DOM']['setIntAttribute'](self['getElement'](), 'size', visibleItems);
			return null;
		}
	, 1, [null,null,['self'],['visibleItems']]);
		$cls_definition['setVisibleItemCount'] = $method;
		$method = $pyjs__bind_method2('checkIndex', function(index) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				index = arguments[1];
			}
			var $or5,$or6,elem;
			elem = self['getElement']();
			if ($p['bool'](($p['bool']($or5=($p['cmp'](index, 0) == -1))?$or5:((($p['cmp'](index, $m['DOM']['getChildCount'](elem)))|1) == 1)))) {
			}
			return null;
		}
	, 1, [null,null,['self'],['index']]);
		$cls_definition['checkIndex'] = $method;
		$method = $pyjs__bind_method2('getSelectedItemText', function(ignore_first_value) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				ignore_first_value = arguments[1];
			}
			if (typeof ignore_first_value == 'undefined') ignore_first_value=arguments['callee']['__args__'][3][1];
			var $iter5_nextval,i,$iter5_array,selected,$iter5_iter,$iter5_idx,$iter5_type,start_idx;
			selected = $p['list']([]);
			if ($p['bool'](ignore_first_value)) {
				start_idx = 1;
			}
			else {
				start_idx = 0;
			}
			$iter5_iter = $p['range'](start_idx, self['getItemCount']());
			$iter5_nextval=$p['__iter_prepare']($iter5_iter,false);
			while (typeof($p['__wrapped_next']($iter5_nextval)['$nextval']) != 'undefined') {
				i = $iter5_nextval['$nextval'];
				if ($p['bool'](self['isItemSelected'](i))) {
					selected['append'](self['getItemText'](i));
				}
			}
			return selected;
		}
	, 1, [null,null,['self'],['ignore_first_value', false]]);
		$cls_definition['getSelectedItemText'] = $method;
		$method = $pyjs__bind_method2('getSelectedValues', function(ignore_first_value) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				ignore_first_value = arguments[1];
			}
			if (typeof ignore_first_value == 'undefined') ignore_first_value=arguments['callee']['__args__'][3][1];
			var $iter6_idx,$iter6_type,selected,i,$iter6_array,$iter6_iter,start_idx,$iter6_nextval;
			selected = $p['list']([]);
			if ($p['bool'](ignore_first_value)) {
				start_idx = 1;
			}
			else {
				start_idx = 0;
			}
			$iter6_iter = $p['range'](start_idx, self['getItemCount']());
			$iter6_nextval=$p['__iter_prepare']($iter6_iter,false);
			while (typeof($p['__wrapped_next']($iter6_nextval)['$nextval']) != 'undefined') {
				i = $iter6_nextval['$nextval'];
				if ($p['bool'](self['isItemSelected'](i))) {
					selected['append'](self['getValue'](i));
				}
			}
			return selected;
		}
	, 1, [null,null,['self'],['ignore_first_value', false]]);
		$cls_definition['getSelectedValues'] = $method;
		$method = $pyjs__bind_method2('setItemTextSelection', function(values) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				values = arguments[1];
			}
			var $iter7_nextval,i,$iter7_iter,$iter7_array,$iter7_idx,$iter7_type;
			if ($p['bool'](!$p['bool'](values))) {
				values = $p['list']([]);
				self['setSelectedIndex'](0);
			}
			$iter7_iter = $p['range'](0, self['getItemCount']());
			$iter7_nextval=$p['__iter_prepare']($iter7_iter,false);
			while (typeof($p['__wrapped_next']($iter7_nextval)['$nextval']) != 'undefined') {
				i = $iter7_nextval['$nextval'];
				if ($p['bool'](values['__contains__'](self['getItemText'](i)))) {
					self['setItemSelected'](i, 'selected');
				}
				else {
					self['setItemSelected'](i, '');
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['values']]);
		$cls_definition['setItemTextSelection'] = $method;
		$method = $pyjs__bind_method2('setValueSelection', function(values) {
			if (this['__is_instance__'] === true) {
				var self = this;
			} else {
				var self = arguments[0];
				values = arguments[1];
			}
			var $iter8_idx,i,$iter8_array,$iter8_iter,$iter8_nextval,$iter8_type;
			if ($p['bool'](!$p['bool'](values))) {
				values = $p['list']([]);
				self['setSelectedIndex'](0);
			}
			$iter8_iter = $p['range'](0, self['getItemCount']());
			$iter8_nextval=$p['__iter_prepare']($iter8_iter,false);
			while (typeof($p['__wrapped_next']($iter8_nextval)['$nextval']) != 'undefined') {
				i = $iter8_nextval['$nextval'];
				if ($p['bool'](values['__contains__'](self['getValue'](i)))) {
					self['setItemSelected'](i, 'selected');
				}
				else {
					self['setItemSelected'](i, '');
				}
			}
			return null;
		}
	, 1, [null,null,['self'],['values']]);
		$cls_definition['setValueSelection'] = $method;
		var $bases = new Array($m['FocusWidget'],$m['ChangeHandler']);
		var $data = $p['dict']();
		for (var $item in $cls_definition) { $data['__setitem__']($item, $cls_definition[$item]); }
		return $p['_create_class']('ListBox', $p['tuple']($bases), $data);
	})();
	$m['Factory']['registerClass']('pyjamas.ui.ListBox', 'ListBox', $m['ListBox']);
	return this;
}; /* end pyjamas.ui.ListBox */


/* end module: pyjamas.ui.ListBox */


/*
PYJS_DEPS: ['pyjamas.DOM', 'pyjamas', 'pyjamas.Factory', 'pyjamas.ui.FocusWidget.FocusWidget', 'pyjamas.ui', 'pyjamas.ui.FocusWidget', 'pyjamas.ui.ChangeListener.ChangeHandler', 'pyjamas.ui.ChangeListener', 'pyjamas.ui.Event']
*/
