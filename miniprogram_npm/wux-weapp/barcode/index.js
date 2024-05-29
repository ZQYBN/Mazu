"use strict";var _barcode=_interopRequireDefault(require("./barcode")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useCanvasAPI=require("../helpers/hooks/useCanvasAPI");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var defalutOptions={number:!0,prefix:!0,color:"black",debug:!1,onValid:function(){},onInvalid:function(){},onSuccess:function(){},onError:function(){}};Component({properties:{width:{type:Number,value:200},height:{type:Number,value:100},number:{type:String,value:""},options:{type:Object,value:_objectSpread({},defalutOptions)},canvasId:{type:String,value:"wux-barcode"}},observers:_defineProperty({},"canvasId, number, width, height, options",function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t[0],o=t[1],i=t[2],a=t[3],u=t[4];this.draw({canvasId:n,number:o,width:i,height:a,options:u})}),methods:{draw:function(e){var n=this,t=0<arguments.length&&void 0!==e?e:{},r=_objectSpread({},this.data,{},t),o=r.canvasId,i=r.number,a=r.width,u=r.height,s=r.options,c=_objectSpread({},defalutOptions,{},s),p={number:c.number,prefix:c.prefix,color:c.color,debug:c.debug};(0,_useCanvasAPI.getCanvasRef)(o,this).then(function(r){["onValid","onInvalid","onSuccess","onError"].forEach(function(e){var t=s[e];p[e]=function(){t&&t(),"onSuccess"===e&&(0,_useCanvasAPI.toDataURL)({width:a,height:u},r).then(function(e){r.getContext("2d").restore(),n.triggerEvent("load",{base64Url:e})}),n.triggerEvent(e.replace(/^on/,"").toLocaleLowerCase())}}),new _barcode.default(r,(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,i,Object.assign({width:a,height:u},p))})}}});