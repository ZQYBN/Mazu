"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames=_interopRequireDefault(require("../helpers/libs/classNames")),_getDefaultContext=require("../helpers/shared/getDefaultContext"),_props=require("../checkbox-group/props");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,o)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(n,!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var defaultContext=_objectSpread({},(0,_getDefaultContext.getDefaultContext)(_props.props,["disabled","readOnly","hasLine","hasFieldDecorator","withListComponent","iconPosition","iconSize","iconOn","iconOff"]),{withListComponent:!1});(0,_baseComponent.default)({useExport:!0,relations:{"../checkbox-group/index":{type:"ancestor"}},properties:{prefixCls:{type:String,value:"wux-checkbox"},cellPrefixCls:{type:String,value:"wux-cell"},selectablePrefixCls:{type:String,value:"wux-selectable"},title:{type:String,value:""},label:{type:String,value:""},extra:{type:String,value:""},value:{type:String,value:""},checked:{type:Boolean,value:!1,observer:function(e){this.setData({inputChecked:e})}},disabled:{type:Boolean,value:!1},readOnly:{type:Boolean,value:!1},color:{type:String,value:"balanced"},wrapStyle:{type:[String,Object],value:""},hasLine:{type:Boolean,value:!0}},data:{inputChecked:!1,index:0,isLast:!1,context:defaultContext},computed:{classes:["prefixCls",function(e){return{cell:(0,_classNames.default)(e),extra:"".concat(e,"__extra"),iconPosition:"".concat(e,"__icon-position"),iconSelectable:"".concat(e,"__icon-selectable"),selectable:"".concat(e,"__selectable"),selectableH:"".concat(e,"__selectable-horizontal")}}]},methods:{checkboxChange:function(e){var t=this.data,n=t.disabled,o=t.readOnly,a=t.context,i=e.detail.checked;n||a.disabled||o||a.readOnly||this.onChange(i)},changeValue:function(e,t,n,o){var a=0<arguments.length&&void 0!==e&&e,i=1<arguments.length&&void 0!==t?t:0,r=2<arguments.length&&void 0!==n&&n,c=3<arguments.length&&void 0!==o?o:defaultContext;this.setData({inputChecked:a,index:i,isLast:r,context:c})},onChange:function(e){var t=this.data,n={checked:e,value:t.value,index:t.index},o=this.getRelationsByName("../checkbox-group/index")[0];o?o.onChange(n):this.triggerEvent("change",n)},setChecked:function(e){this.data.inputChecked!==e&&this.setData({inputChecked:e}),this.onChange(e)},check:function(){this.setChecked(!0)},uncheck:function(){this.setChecked(!1)},toggle:function(){this.setChecked(!this.data.inputChecked)}}});