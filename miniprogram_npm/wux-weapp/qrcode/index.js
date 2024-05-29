"use strict";var _observers,_baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames=_interopRequireDefault(require("../helpers/libs/classNames")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useCanvasAPI=require("../helpers/hooks/useCanvasAPI"),_index=_interopRequireDefault(require("./qr.js/index"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var utf16to8=function(e){for(var t=e.length,r="",a=0;a<t;a++){var n=e.charCodeAt(a);1<=n&&n<=127?r+=e.charAt(a):(2047<n?(r+=String.fromCharCode(224|n>>12&15),r+=String.fromCharCode(128|n>>6&63)):r+=String.fromCharCode(192|n>>6&31),r+=String.fromCharCode(128|n>>0&63))}return r};(0,_baseComponent.default)({useExport:!0,properties:{prefixCls:{type:String,value:"wux-qrcode"},typeNumber:{type:Number,value:-1},errorCorrectLevel:{type:Number,value:2},width:{type:Number,value:200},height:{type:Number,value:200},whiteSpace:{type:Number,value:0},fgColor:{type:String,value:"black"},bgColor:{type:String,value:"white"},data:{type:String,value:""},showMenuByLongpress:{type:Boolean,value:!1},qrcodeStatus:{type:String,value:"activated"},qrcodeExpiredText:{type:String,value:"二维码过期"},qrcodeRefreshText:{type:String,value:"点击刷新"}},data:{wrapStyle:"",base64Url:""},observers:(_observers={},_defineProperty(_observers,"height, width",function(e,t){this.updateStyle(e,t)}),_defineProperty(_observers,"prefixCls, typeNumber, errorCorrectLevel, width, height, whiteSpace, fgColor, bgColor, data",function(){this.setBase64Url.apply(this,arguments)}),_observers),computed:{classes:["prefixCls",function(e){return{wrap:(0,_classNames.default)(e),canvas:"".concat(e,"__canvas"),image:"".concat(e,"__image"),mask:"".concat(e,"__mask"),expired:"".concat(e,"__expired"),refresh:"".concat(e,"__refresh"),icon:"".concat(e,"__icon")}}]},methods:_defineProperty({updateStyle:function(e,t){var r=(0,_styleToCssString.default)({height:"".concat(e,"px"),width:"".concat(t,"px")});this.setData({wrapStyle:r})},setBase64Url:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=t[0],n=t[1],o=t[2],i=t[3],s=t[4],u=t[5],l=t[6],c=t[7],h=t[8];this.createCanvasContext({prefixCls:a,typeNumber:n,errorCorrectLevel:o,width:i,height:s,whiteSpace:u,fgColor:l,bgColor:c,data:h})},createCanvasContext:function(t){var n=this,e=t.prefixCls,r=t.typeNumber,a=t.errorCorrectLevel,o=t.width,i=t.height,u=t.whiteSpace,l=t.fgColor,c=t.bgColor,s=t.data,h=(0,_index.default)(utf16to8(s),{typeNumber:r,errorCorrectLevel:a}).modules,f=(o-2*u)/h.length,p=(i-2*u)/h.length,d="".concat(e,"__canvas"),v=Promise.resolve();return v=(v=v.then(function(){return(0,_useCanvasAPI.getCanvasRef)(d,n).then(function(e){var s=(n.canvas=e).getContext("2d"),t=(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,r=o*t,a=i*t;return e.width=r,e.height=a,s.scale(t,t),s.fillStyle="#ffffff",s.fillRect(0,0,o,i),h.forEach(function(e,i){e.forEach(function(e,t){s.fillStyle=e?l:c;var r=Math.round(t*f)+u,a=Math.round(i*p)+u,n=Math.ceil((t+1)*f)-Math.floor(t*f),o=Math.ceil((i+1)*p)-Math.floor(i*p);s.fillRect(r,a,n,o)})}),(0,_useCanvasAPI.toDataURL)({width:o,height:i},e).then(function(e){return s.restore(),e})})})).then(function(e){!function(e){t.base64Url!==e&&(n.setData({base64Url:e}),n.triggerEvent("load",{base64Url:e}))}(e)},function(e){n.triggerEvent("error",e)})},onTap:function(){this.triggerEvent("click")},onMaskClick:function(){"expired"===this.data.qrcodeStatus&&this.triggerEvent("refresh")}},"export",function(){var e=this;return{getCanvasNode:function(){return e.canvas},getBase64Url:function(){return e.data.base64Url}}}),ready:function(){var e=this.data,t=e.height,r=e.width;this.updateStyle(t,r),this.createCanvasContext(this.data)}});