"use strict";var _useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useCanvasAPI=require("../helpers/hooks/useCanvasAPI"),randomNum=function(e,t){return Math.floor(Math.random()*(t-e)+e)},randomColor=function(e,t){var a=randomNum(e,t),n=randomNum(e,t),r=randomNum(e,t);return"rgb(".concat(a,", ").concat(n,", ").concat(r,")")},render=function(e,t){var a=1<arguments.length&&void 0!==t?t:{},n=a.str,r=a.num,o=a.width,i=a.height,u=a.bgColor,l=a.fontColor,s=a.hasPoint,m=a.hasLine,v=(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,h="";e.textBaseline="bottom",e.fillStyle=u||randomColor(180,240),e.scale(v,v),e.fillRect(0,0,o,i);for(var d=0;d<r;d++){var c=(o-10)/r*d+10,f=randomNum(i/2,i),g=randomNum(-45,45),C=n[randomNum(0,n.length)],N=randomNum(16,40),p=parseInt(i/2);h+=C,e.fillStyle=l||randomColor(10,100),e.font="normal normal normal ".concat(p<N?p:N,"px sans-serif"),e.translate(c,f),e.rotate(g*Math.PI/180),e.fillText(C,0,0),e.rotate(-g*Math.PI/180),e.translate(-c,-f)}if(m)for(var y=0;y<r;y++)e.strokeStyle=randomColor(90,180),e.beginPath(),e.moveTo(randomNum(0,o),randomNum(0,i)),e.lineTo(randomNum(0,o),randomNum(0,i)),e.stroke();if(s)for(var I=0;I<10*r;I++)e.fillStyle=randomColor(0,255),e.beginPath(),e.arc(randomNum(0,o),randomNum(0,i),1,0,2*Math.PI),e.fill();return h};Component({properties:{str:{type:String,value:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"},num:{type:Number,value:6},width:{type:Number,value:120},height:{type:Number,value:40},bgColor:{type:String,value:""},fontColor:{type:String,value:""},hasPoint:{type:Boolean,value:!0},hasLine:{type:Boolean,value:!0},canvasId:{type:String,value:"wux-vcode"}},methods:{createCanvasContext:function(i){var n=this,u=i.width,l=i.height,e=i.canvasId,t=Promise.resolve();return t=(t=t.then(function(){return(0,_useCanvasAPI.getCanvasRef)(e,n).then(function(e){var t=e.getContext("2d"),a=(0,_useNativeAPI.getSystemInfoSync)(["window"]).pixelRatio,n=u*a,r=l*a;e.width=n,e.height=r;var o=render(t,i);return(0,_useCanvasAPI.toDataURL)({width:u,height:l},e).then(function(e){return t.restore(),{value:o,base64Url:e}})})})).then(function(e){!function(e){var t=e.value,a=e.base64Url;n.triggerEvent("change",{value:t,base64Url:a})}({value:e.value,base64Url:e.base64Url})},function(e){n.triggerEvent("error",e)})},draw:function(){this.createCanvasContext(this.data)}},ready:function(){this.createCanvasContext(this.data)}});