"use strict";var _observers,_baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_popupMixin=_interopRequireDefault(require("../helpers/mixins/popupMixin")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_utils=require("./utils");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}(0,_baseComponent.default)({behaviors:[(0,_popupMixin.default)(_utils.POPUP_SELECTOR)],properties:_objectSpread({prefixCls:{type:String,value:_utils.POPUP_SELECTOR.substring(1)},virtualized:{type:Boolean,value:!1},notFoundContent:{type:null,value:_objectSpread({},_utils.notFoundContent)}},(0,_utils.getDefaultProps)()),data:{mergedOptions:[],mergedOptionsValueMap:new Map,mergedNotFoundContent:_objectSpread({},_utils.notFoundContent)},observers:(_observers={},_defineProperty(_observers,"options, multiple",function(e,t){var r=(0,_utils.flattenOptions)(e),n=new Map;r.forEach(function(e,t){n.set(e.value,{option:e,index:t})}),this.setData({mergedOptions:r,mergedOptionsValueMap:n})}),_defineProperty(_observers,"notFoundContent",function(e){this.renderEmpty(e)}),_observers),methods:{renderEmpty:function(e){var t=(0,_utils.getNotFoundContent)(e);this.data.mergedNotFoundContent!==t&&this.setData({mergedNotFoundContent:t})},updated:function(e,t){this.hasFieldDecorator&&!t||this.data.inputValue!==e&&this.setData({inputValue:e})},getIndexRef:function(e){var t=0<arguments.length&&void 0!==e?e:this.data;if(t.multiple){var r=t.value.length;if(0<t.value.length&&t.mergedOptionsValueMap.has(t.value[r-1]))return t.mergedOptionsValueMap.get(t.value[r-1]).index}else{if(t.value&&t.mergedOptionsValueMap.has(t.value))return t.mergedOptionsValueMap.get(t.value).index}return-1},scrollToItem:function(e){var t=this.querySelector(_utils.POPUP_SELECTOR);t&&t.scrollToItem(e)},onShow:function(){var t=this,e=this.data.value,r=this.data.inputValue;if(r!==e&&(r=e),this.hasFieldDecorator){var n=this.getFieldContext();n&&(r=n.data.value,n.changeValue(r))}this.data.inputValue!==r&&this.updated(r),(0,_useNativeAPI.nextTick)(function(){var e=t.getIndexRef(_objectSpread({},t.data,{value:r}));-1!==e&&t.scrollToItem(e)})},getPickerValue:function(e){var t=0<arguments.length&&void 0!==e?e:this.data.inputValue,r=this.data,n=r.virtualized,i=r.mergedOptions,o=n?i:void 0;return this.picker=this.picker||this.querySelector(_utils.POPUP_SELECTOR),this.picker&&this.picker.getValue(t,o)},onSelectChange:function(e){if(this.mounted){var t=e.detail.value;this.updated(t,!0),this.triggerEvent("valueChange",this.formatPickerValue(_objectSpread({},e.detail)))}}},ready:function(){this.renderEmpty(this.data.notFoundContent)}});