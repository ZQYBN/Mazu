"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_useDOM=require("../helpers/hooks/useDOM");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}(0,_baseComponent.default)({options:{multipleSlots:!1},relations:{"../cell/index":{type:"descendant",observer:function(){this.callDebounceFn(this.updateIsLastElement)}}},properties:{prefixCls:{type:String,value:"wux-cell-group"},title:{type:String,value:""},label:{type:String,value:""},mode:{type:String,value:"default"},bodyStyle:{type:[String,Object],value:"",observer:function(e){this.setData({internalBodyStyle:(0,_styleToCssString.default)(e)})}},hasLine:{type:Boolean,value:!0}},data:{internalBodyStyle:""},computed:{classes:["prefixCls, mode, hasLine",function(e,t,n){var a;return{wrap:(0,_classNames2.default)(e,(_defineProperty(a={},"".concat(e,"--card"),"card"===t),_defineProperty(a,"".concat(e,"--has-line"),n),a)),hd:"".concat(e,"__hd"),bd:"".concat(e,"__bd"),ft:"".concat(e,"__ft")}}]},methods:{updateIsLastElement:function(){var e=this.getRelationsByName("../cell/index");if(0<e.length){var n=e.length-1;e.forEach(function(e,t){e.updateIsLastElement(t===n)})}},getBoundingClientRect:function(t){var n=this;(0,_useDOM.useRect)(".".concat(this.data.prefixCls),this).then(function(e){e&&t.call(n,e.height,e)})}}});