"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(n,!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var defaultIcon={type:"success",size:93,color:"#33cd5f"},getIcon=function(e){return null!==e&&"object"===_typeof(e)?Object.assign({},defaultIcon,e):"string"==typeof e?Object.assign({},defaultIcon,{type:e}):""===e||!1===e?null:defaultIcon};(0,_baseComponent.default)({properties:{prefixCls:{type:String,value:"wux-result"},icon:{type:null,value:defaultIcon,observer:function(e){this.setData({resultIcon:getIcon(e)})}},title:{type:String,value:""},label:{type:String,value:""},buttons:{type:Array,value:[]},extra:{type:String,value:""},fixed:{type:Boolean,value:!1}},data:{resultIcon:null},computed:{classes:["prefixCls, fixed",function(e,t){return{wrap:(0,_classNames2.default)(e,_defineProperty({},"".concat(e,"--fixed"),t)),hd:"".concat(e,"__hd"),icon:"".concat(e,"__icon"),bd:"".concat(e,"__bd"),title:"".concat(e,"__title"),desc:"".concat(e,"__desc"),buttons:"".concat(e,"__buttons"),ft:"".concat(e,"__ft")}}]},methods:{onClick:function(e){this.triggerEvent("click",e.currentTarget.dataset)},bindgetuserinfo:function(e){this.triggerEvent("getuserinfo",_objectSpread({},e.detail,{},e.currentTarget.dataset))},bindcontact:function(e){this.triggerEvent("contact",_objectSpread({},e.detail,{},e.currentTarget.dataset))},bindgetphonenumber:function(e){this.triggerEvent("getphonenumber",_objectSpread({},e.detail,{},e.currentTarget.dataset))},bindopensetting:function(e){this.triggerEvent("opensetting",_objectSpread({},e.detail,{},e.currentTarget.dataset))},bindlaunchapp:function(e){this.triggerEvent("launchapp",_objectSpread({},e.detail,{},e.currentTarget.dataset))},bindchooseavatar:function(e){this.triggerEvent("chooseavatar",_objectSpread({},e.detail,{},e.currentTarget.dataset))},onError:function(e){this.triggerEvent("error",_objectSpread({},e.detail,{},e.currentTarget.dataset))}},attached:function(){this.setData({resultIcon:getIcon(this.data.icon)})}});