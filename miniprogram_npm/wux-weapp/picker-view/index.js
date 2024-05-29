"use strict";var _observers,_baseComponent=_interopRequireDefault(require("../helpers/baseComponent")),_classNames2=_interopRequireDefault(require("../helpers/libs/classNames")),_shallowEqual=_interopRequireDefault(require("../helpers/libs/shallowEqual")),_styleToCssString=_interopRequireDefault(require("../helpers/libs/styleToCssString")),_fieldNamesBehavior=_interopRequireDefault(require("../helpers/mixins/fieldNamesBehavior")),_gestures=require("../helpers/shared/gestures"),_useNativeAPI=require("../helpers/hooks/useNativeAPI"),_props=require("./props"),_utils=require("./utils");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _defineProperty(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function getStyles(t){return Array.isArray(t)?t.map(function(t){return(0,_styleToCssString.default)(t)}):(0,_styleToCssString.default)(t)}(0,_baseComponent.default)({behaviors:[_fieldNamesBehavior.default],properties:_props.props,data:{inputValue:null,selectedIndex:null,selectedValue:null,cols:[],extIndicatorStyle:"",extItemStyle:"",extMaskStyle:"",contentStyle:"",itemCount:7,styles:{}},computed:{classes:["prefixCls, labelAlign",function(t,e){return{wrap:(0,_classNames2.default)(t,_defineProperty({},"".concat(t,"--").concat(e),e)),mask:"".concat(t,"__mask"),indicator:"".concat(t,"__indicator"),content:"".concat(t,"__content"),item:"".concat(t,"__item"),image:"".concat(t,"__image")}}]},observers:(_observers={itemHeight:function(t){this.updatedStyles(t)},itemStyle:function(t){this.setData({extItemStyle:getStyles(t)})},indicatorStyle:function(t){this.setData({extIndicatorStyle:getStyles(t)})},maskStyle:function(t){this.setData({extMaskStyle:getStyles(t)})}},_defineProperty(_observers,"value, options",function(t,e){var s=this.data.controlled,i=this.getFieldNames(),a=(0,_utils.getRealCol)(e,i);(0,_shallowEqual.default)(this.data.cols,a)||this.setData({cols:a}),s&&this.setValue(t,!0)}),_defineProperty(_observers,"inputValue",function(t){var e=this.getValue(t),s=e.selectedIndex,i=e.selectedValue;this.setData({selectedIndex:s,selectedValue:i})}),_observers),methods:{updatedStyles:function(t){var e=this.data.itemCount;e%2==0&&e--,e--,e/=2;var s={wrap:"height: ".concat(t*this.data.itemCount,"px;"),item:"line-height: ".concat(t,"px; height: ").concat(t,"px;"),image:"width: ".concat(.6*t,"px; height: ").concat(.6*t,"px;"),content:"padding: ".concat(t*e,"px 0;"),indicator:"top: ".concat(t*e,"px; height: ").concat(t,"px;"),mask:"background-size: 100% ".concat(t*e,"px;")};this.setData({styles:s})},updated:function(t,e){var s=this;this.data.inputValue===t&&!e||this.setData({inputValue:t}),e&&this.select(t,this.data.itemHeight,function(t){return s.scrollTo(t,0,!1)})},setValue:function(t,e){var s=this.getValue(t).value;this.updated(s,e)},getValue:function(t,e){var s=0<arguments.length&&void 0!==t?t:this.data.inputValue,i=1<arguments.length&&void 0!==e?e:this.data.cols,a=this.getFieldNames(),l=(0,_utils.getRealValue)(s,i,a)||null,n=l,r=(0,_utils.getIndexFromValue)(s,i,a);return{value:l,displayValue:(0,_utils.getLabelFromIndex)(r,i,a.label),selectedIndex:r,selectedValue:n,cols:i}},scrollTo:function(t,e,s){var i=this,a=1<arguments.length&&void 0!==e?e:.3,l=!(2<arguments.length&&void 0!==s)||s;this.scrollY!==t&&(this.runCallbacks&&(clearTimeout(this.runCallbacks),this.runCallbacks=null),this.scrollY=t,this.setTransform(-t,a,function(){l&&(i.runCallbacks=setTimeout(function(){i.setTransform(-t,0,i.scrollingComplete)},1e3*+a))}))},onFinish:function(){var e=this;this.isMoving=!1;var t=this.scrollY,s=this.data,i=s.cols,a=s.itemHeight,l=(i.length-1)*a;t%a!=0&&(t=Math.round(t/a)*a),t<0?t=0:l<t&&(t=l);var n=this.getChildMeta(t,a),r=this.getFieldName("disabled");n&&!n[r]?this.scrollTo(t,.3):this.select(this.data.inputValue,a,function(t){return e.scrollTo(t,0,!1)}),this.onScrollChange()},onTouchStart:function(t){1<(0,_gestures.getPointsNumber)(t)||(this.isMoving=!0,this.startY=(0,_gestures.getTouchPoints)(t).y,this.lastY=this.scrollY,this.triggerEvent("beforeChange",this.getValue()))},onTouchMove:function(t){!this.isMoving||1<(0,_gestures.getPointsNumber)(t)||(this.scrollY=this.lastY-(0,_gestures.getTouchPoints)(t).y+this.startY,this.setTransform(-this.scrollY,!1,this.onScrollChange))},onTouchEnd:function(t){1<(0,_gestures.getPointsNumber)(t)||this.onFinish()},onItemClick:function(t){var e=t.currentTarget.dataset,s=e.index;e.disabled||this.scrollTo(s*this.data.itemHeight)},setTransform:function(t,e,s){var i={transform:"translate3d(0,".concat(t,"px,0)"),transition:e?"cubic-bezier(0, 0, 0.2, 1.15) ".concat(e,"s"):"none"};this.setData({contentStyle:(0,_styleToCssString.default)(i)},s)},select:function(t,e,s){var i=this.getFieldNames(),a=this.data.cols,l=(0,_utils.getIndexFromValue)(t,a,i);this.selectByIndex(l,e,s)},selectByIndex:function(t,e,s){t<0||t>=this.data.cols.length||!e||s.call(this,t*e)},computeChildIndex:function(t,e,s){var i=Math.round(t/e);return Math.min(i,s-1)},getChildMeta:function(t,e){var s=this.data.cols;return s[this.computeChildIndex(t,e,s.length)]},scrollingComplete:function(){var t=this.scrollY;if(0<=t){var e=this.getFieldName("value"),s=this.data.itemHeight,i=this.getChildMeta(t,s);if(i){var a=i[e];this.data.inputValue!==a&&this.fireValueChange(a)}}},onScrollChange:function(){var t=this.scrollY;if(0<=t){var e=this.getFieldName("value"),s=this.data,i=s.cols,a=s.itemHeight,l=this.computeChildIndex(t,a,i.length);if(this.scrollValue!==l){var n=i[this.scrollValue=l];if(n){var r=this.getValue(n[e]);this.triggerEvent("scrollChange",r)}(0,_useNativeAPI.vibrateShort)()}}},fireValueChange:function(t){this.data.controlled||this.updated(t),this.triggerEvent("valueChange",this.getValue(t)),(0,_useNativeAPI.vibrateShort)()}},created:function(){this.scrollValue=void 0,this.scrollY=-1,this.lastY=0,this.startY=0,this.isMoving=!1},attached:function(){var t=this.data,e=t.defaultValue,s=t.value,i=t.controlled,a=t.options,l=t.itemHeight,n=i?s:e,r=this.getFieldNames(),o=(0,_utils.getRealCol)(a,r);this.updatedStyles(l),this.setData({cols:o}),this.setValue(n,!0)}});