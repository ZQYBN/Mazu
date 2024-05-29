"use strict";var _baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames")),_warning=_interopRequireDefault(require("../helpers/libs/warning")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_useDOM=require("../helpers/hooks/useDOM");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function ownKeys(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(n,!0).forEach(function(e){_defineProperty(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var n=[],i=!0,r=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(i=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);i=!0);}catch(e){r=!0,a=e}finally{try{i||null==s.return||s.return()}finally{if(r)throw a}}return n}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var findActiveByIndex=function(t,n,e){return e.filter(function(e){return e.index===t&&e.name===n})[0]},findActiveByPosition=function(t,n,e){return e.filter(function(e){return t<e.top+e.height-n&&t>=e.top-n})[0]};(0,_baseComponent.default)({useExport:!0,relations:{"../index-item/index":{type:"child",observer:function(){this.callDebounceFn(this.updated)}}},properties:{prefixCls:{type:String,value:"wux-index"},height:{type:[String,Number],value:300,observer:"updateStyle"},showIndicator:{type:Boolean,value:!0},indicatorPosition:{type:String,value:"center"},parentOffsetTop:{type:Number,value:0}},data:{colHight:0,points:[],scrollTop:0,children:[],moving:!1,current:0,currentName:"",currentBrief:"",extStyle:"",indicatorStyle:""},computed:{classes:["prefixCls, indicatorPosition",function(e,t){return{wrap:(0,_classNames2.default)(e),nav:"".concat(e,"__nav"),navRow:"".concat(e,"__nav-row"),navCol:"".concat(e,"__nav-col"),navItem:"".concat(e,"__nav-item"),indicator:(0,_classNames2.default)("".concat(e,"__indicator"),_defineProperty({},"".concat(e,"__indicator--").concat(t),t))}}]},methods:{updateStyle:function(e){var t=0<arguments.length&&void 0!==e?e:this.data.height,n=(0,_styleToCssString.default)({height:t});n!==this.data.extStyle&&this.setData({extStyle:n})},updated:function(){var e=this.getRelationsByName("../index-item/index");0<e.length&&(e.forEach(function(e,t){e.updated(t)}),setTimeout(this.getNavPoints.bind(this))),this.updateChildren()},setActive:function(e,t){if(e!==this.data.current||t!==this.data.currentName){var n=findActiveByIndex(e,t,this.data.children),i=void 0!==n?n.brief:t.charAt(0);if(void 0!==n){var r=this.data,a=r.colHight,o="right"===r.indicatorPosition?(0,_styleToCssString.default)({top:e*a+a/2}):"";this.setData({current:e,currentName:t,currentBrief:i,scrollTop:n.top-this.data.parentOffsetTop,indicatorStyle:o})}(0,_useNativeAPI.vibrateShort)(),this.triggerEvent("change",{index:e,name:t,brief:i})}},onTouchStart:function(e){if(!this.data.moving){var t=e.target.dataset,n=t.index,i=t.name;this.setActive(n,i),this.setData({moving:!0})}},onTouchMove:function(e){var t=this.getTargetFromPoint(e.changedTouches[0].pageY);if(void 0!==t){var n=t.dataset,i=n.index,r=n.name;this.setActive(i,r)}},onTouchEnd:function(){var e=this;this.data.moving&&setTimeout(function(){return e.setData({moving:!1})},300)},onScroll:function(e){this.data.moving||this.checkActiveIndex.call(this,this.data,e)},getNavPoints:function(){var r=this,e=".".concat(this.data.prefixCls,"__nav-col"),t=".".concat(this.data.prefixCls,"__nav-item");(0,_useDOM.useRectAll)([e,t],this).then(function(e){var t=_slicedToArray(e,2),n=t[0],i=t[1];(n.length||i.length)&&r.setData({colHight:n[0].height,points:i.map(function(e){return _objectSpread({},e,{offsets:[e.top,e.top+e.height]})})})})},getTargetFromPoint:function(e){for(var t,n=this.data.points,i=n.length-1;0<=i;i--){var r=_slicedToArray(n[i].offsets,2),a=r[0],o=r[1];if(i===n.length-1&&o<e||0===i&&e<a||a<=e&&e<=o){t=n[i];break}}return t},getInternalHooks:function(e){return"INDEX_HOOK_MARK"===e?{updateChildren:this.updateChildren.bind(this)}:((0,_warning.default)(!1,"`getInternalHooks` is internal usage of the <index />. Should not call directly."),null)},expose:function(){var i=this;return{scrollTo:function(t){var e=i.data.children,n="number"==typeof t?e.filter(function(e){return e.index===t})[0]:e.filter(function(e){return e.name===t})[0];n&&(i.setData({moving:!0}),i.setActive(n.index,n.name),setTimeout(function(){return i.setData({moving:!1})},300))},getInternalHooks:this.getInternalHooks.bind(this)}}},created:function(){var o=this,e=this.useThrottleFn(function(e,t){var n=findActiveByPosition(t.detail.scrollTop,e.parentOffsetTop,e.children);if(void 0!==n){var i=n.index,r=n.name,a=n.brief;i===e.current&&r===e.currentName||(o.setData({current:i,currentName:r,currentBrief:a}),o.triggerEvent("change",{index:i,name:r,brief:a}))}},50,{trailing:!0,leading:!0}).run;this.checkActiveIndex=e;var t=this.useThrottleFn(function(){var e=o.getRelationsByName("../index-item/index").map(function(e){return function(e){return{name:e.name,index:e.index,top:e.top,height:e.height,brief:e.brief}}(e.data)});o.setData({children:e})},50,{trailing:!0,leading:!0}).run;this.updateChildren=t},ready:function(){this.updateStyle(),this.getNavPoints(),this.updateChildren()}});