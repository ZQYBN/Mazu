"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_eventsMixin=_interopRequireDefault(require("../helpers/mixins/eventsMixin")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),common=_interopRequireWildcard(require("../helpers/wxs/common")),_props=require("./props");function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var i=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};i.get||i.set?Object.defineProperty(t,n,i):t[n]=e[n]}return t.default=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(n,!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var fieldNames={lable:"title",value:"value"},getOptions=function(e){return common.getOptions(e,fieldNames)};(0,_baseComponent.default)({useField:!0,behaviors:[(0,_eventsMixin.default)()],relations:{"../field/index":{type:"ancestor"},"../radio/index":{type:"descendant",observer:function(){this.callDebounceFn(this.changeValue)}}},properties:_props.props,data:{fieldNames:fieldNames,inputValue:"",keys:[]},observers:_defineProperty({value:function(e){this.hasFieldDecorator||(this.updated(e),this.changeValue({value:e}))},inputValue:function(e){this.hasFieldDecorator&&this.changeValue({value:e})}},"options, disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls",function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=t[0],r=t[1],o=t[2],a=t[3],u=t[4],l=t[5],s=t[6],c=t[7],p=t[8],d=t[9];this.changeValue({value:this.data.inputValue,options:i,disabled:r,readOnly:o,hasLine:a,withListComponent:u,iconPosition:l,iconSize:s,iconOn:c,iconOff:p,prefixCls:d})}),methods:{updated:function(e){this.data.inputValue!==e&&this.setData({inputValue:e})},changeValue:function(e){var l=this,t=0<arguments.length&&void 0!==e?e:{},n=_objectSpread({},this.data,{value:this.data.inputValue},t),s=n.value,i=n.options,c=n.disabled,p=n.readOnly,d=n.hasLine,f=n.withListComponent,h=n.iconPosition,v=n.iconSize,g=n.iconOn,O=n.iconOff,r=n.prefixCls,o=getOptions(i);(0,_useNativeAPI.nextTick)(function(){!function(e){var a=[];if(e&&0<e.length){var u=e.length-1;e.forEach(function(e,t){var n=s===e.data.value,i=t===u,r=""===v,o=""===g&&""===O;e.changeValue(n,t,i,{disabled:c,readOnly:p,hasLine:d,hasFieldDecorator:!!l.hasFieldDecorator,withListComponent:f,iconPosition:h,iconSize:f?v:r?"23":v,iconOn:f?g:o?"success":g,iconOff:f?O||g:o?"circle":O}),a.push(e.data)})}l.data.keys!==a&&l.setData({keys:a})}(0<o.length?l.querySelectorAll(".".concat(r,"__radio")):l.getRelationsByName("../radio/index"))})},onChange:function(e){this.triggerEvent("change",_objectSpread({},e,{},this.getValue(e.value),{name:this.data.name,value:e.value}))},onRadioChange:function(e){var t=e.currentTarget.dataset.index;this.onChange(_objectSpread({},e.detail,{index:t}))},getValue:function(e,t){var n=0<arguments.length&&void 0!==e?e:this.data.inputValue,i=1<arguments.length&&void 0!==t?t:this.data.keys,r=n?[n]:[],o=i.filter(function(e){return r.includes(e.value)}).map(function(e){return e.title})||[],a=i.map(function(e){return e.value}),u=r.map(function(e){return a.indexOf(e)});return{value:n,displayValue:null!=o[0]?o[0]:"",selectedIndex:null!=u[0]?u[0]:-1,selectedValue:n,cols:i}},getBoundingClientRect:function(e){return this.cellGroup=this.cellGroup||this.querySelector("#wux-cell-group"),this.cellGroup&&this.cellGroup.getBoundingClientRect(e)}}});