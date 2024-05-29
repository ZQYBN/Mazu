"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isNullValue=isNullValue,exports.fixNullValue=fixNullValue,exports.flattenArray=flattenArray,exports.treeTraverse=treeTraverse,exports.flattenFields=flattenFields,exports.normalizeValidateRules=normalizeValidateRules,exports.getValidateTriggers=getValidateTriggers,exports.getParams=getParams,exports.isEmptyObject=isEmptyObject,exports.hasRules=hasRules,exports.getErrorStrs=getErrorStrs,exports.startsWith=startsWith,exports.getValueFromEvent=getValueFromEvent,exports.transformRules=transformRules,exports.replaceMessage=replaceMessage,exports.isFormField=isFormField,exports.createFormField=createFormField,exports.internalFlattenFields=internalFlattenFields,exports.default=createFieldsStore;var _warning=_interopRequireDefault(require("../libs/warning")),_util=require("../shared/util");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,i)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function isNullValue(e){return null==e}function fixNullValue(e){return isNullValue(e)?null:e}function flattenArray(e){return Array.prototype.concat.apply([],e)}function treeTraverse(){var r=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",i=1<arguments.length?arguments[1]:void 0,n=2<arguments.length?arguments[2]:void 0,l=3<arguments.length?arguments[3]:void 0,a=4<arguments.length?arguments[4]:void 0;if(n(r,i))a(r,i);else if(null==i);else if(Array.isArray(i))i.forEach(function(e,t){return treeTraverse("".concat(r,"[").concat(t,"]"),e,n,l,a)});else{if("object"!==_typeof(i))return void(0,_warning.default)(!1,l);Object.keys(i).forEach(function(e){var t=i[e];treeTraverse("".concat(r).concat(r?".":"").concat(e),t,n,l,a)})}}function flattenFields(e,t,r){var i={};return treeTraverse(void 0,e,t,r,function(e,t){i[e]=t}),i}function normalizeValidateRules(e,t,r){var i=e.map(function(e){var t=_objectSpread({},e,{trigger:e.trigger||[]});return"string"==typeof t.trigger&&(t.trigger=[t.trigger]),t});return t&&i.push({trigger:r?[].concat(r):[],rules:t}),i}function getValidateTriggers(e){return e.filter(function(e){return!!e.rules&&e.rules.length}).map(function(e){return e.trigger}).reduce(function(e,t){return e.concat(t)},[])}function getParams(e,t,r){var i=e,n=t,l=r;return void 0===r&&("function"==typeof i?(l=i,n={},i=void 0):Array.isArray(i)?n="function"==typeof n?(l=n,{}):n||{}:(l=n,n=i||{},i=void 0)),{names:i,options:n,callback:l}}function isEmptyObject(e){return 0===Object.keys(e).length}function hasRules(e){return!!e&&e.some(function(e){return e.rules&&e.rules.length})}function getErrorStrs(e){return e?e.map(function(e){return e&&e.message?e.message:e}):e}function startsWith(e,t){return 0===e.lastIndexOf(t,0)}function getValueFromEvent(e){function t(e){return"checkbox"===e.type?e.checked:e.value}return e&&e.detail?t(e.detail):e?t(e):e}function transformRules(e){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:getCurrentPages()[getCurrentPages().length-1];return e.map(function(e){var t=_objectSpread({},e);return"string"==typeof e.pattern&&(t.pattern=new RegExp(e.pattern)),"string"==typeof e.transform&&r&&r[e.transform]&&(t.transform=r[e.transform]),"string"==typeof e.validator&&r&&r[e.validator]&&(t.validator=r[e.validator]),t})}function replaceMessage(e,r){return e.replace(/\$\{\w+\}/g,function(e){var t=e.slice(2,-1);return r[t]})}var Field=function e(t){_classCallCheck(this,e),Object.assign(this,t)};function isFormField(e){return e instanceof Field}function createFormField(e){return isFormField(e)?e:new Field(e)}function internalFlattenFields(e){return flattenFields(e,function(e,t){return isFormField(t)},"You must wrap field data with `createFormField`.")}var FieldsStore=function(){function t(){var n=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,t),_defineProperty(this,"setFieldsInitialValue",function(e){var r=n.flattenRegisteredFields(e),i=n.fieldsMeta;Object.keys(r).forEach(function(e){if(i[e]){var t=n.getFieldMeta(e);isNullValue(t.initialValue)&&n.setFieldMeta(e,_objectSpread({},t,{initialValue:fixNullValue(r[e])}))}})}),_defineProperty(this,"getAllValues",function(){var e=n.fieldsMeta,r=n.fields;return Object.keys(e).reduce(function(e,t){return(0,_util.set)(e,t,n.getValueFromFields(t,r))},{})}),_defineProperty(this,"getFieldsValue",function(e){return n.getNestedFields(e,n.getFieldValue)}),_defineProperty(this,"getFieldValue",function(e){var t=n.fields;return n.getNestedField(e,function(e){return n.getValueFromFields(e,t)})}),_defineProperty(this,"getFieldsError",function(e){return n.getNestedFields(e,n.getFieldError)}),_defineProperty(this,"getFieldError",function(e){return n.getNestedField(e,function(e){return getErrorStrs(n.getFieldMember(e,"errors"))})}),_defineProperty(this,"isFieldValidating",function(e){return n.getFieldMember(e,"validating")}),_defineProperty(this,"isFieldsValidating",function(e){return(e||n.getValidFieldsName()).some(function(e){return n.isFieldValidating(e)})}),_defineProperty(this,"isFieldTouched",function(e){return n.getFieldMember(e,"touched")}),_defineProperty(this,"isFieldsTouched",function(e){return(e||n.getValidFieldsName()).some(function(e){return n.isFieldTouched(e)})}),this.fields=internalFlattenFields(e),this.fieldsMeta={}}return _createClass(t,[{key:"updateFields",value:function(e){this.fields=internalFlattenFields(e)}},{key:"flattenRegisteredFields",value:function(e){var t=this.getAllFieldsName();return flattenFields(e,function(e){return 0<=t.indexOf(e)},"You cannot set a form field before rendering a field associated with the value.")}},{key:"setFields",value:function(e){var t=_objectSpread({},this.fields,{},e);this.fields=t}},{key:"resetFields",value:function(e){var i=this.fieldsMeta;return(e?this.getValidFieldsFullName(e):this.getAllFieldsName()).reduce(function(e,t){var r=i[t];return r&&(e[t]={value:fixNullValue(r.initialValue)}),e},{})}},{key:"setFieldMeta",value:function(e,t){this.fieldsMeta[e]=t}},{key:"setFieldsAsDirty",value:function(){var i=this;Object.keys(this.fields).forEach(function(e){var t=i.fields[e],r=i.fieldsMeta[e];t&&r&&hasRules(r.validate)&&(i.fields[e]=_objectSpread({},t,{dirty:!0}))})}},{key:"getFieldMeta",value:function(e){return this.fieldsMeta[e]=this.fieldsMeta[e]||{},this.fieldsMeta[e]}},{key:"getValueFromFields",value:function(e,t){var r=t[e];if(r&&"value"in r)return fixNullValue(r.value);var i=this.getFieldMeta(e);return i&&fixNullValue(i.initialValue)}},{key:"getValidFieldsName",value:function(){var t=this,e=this.fieldsMeta;return e?Object.keys(e).filter(function(e){return!t.getFieldMeta(e).hidden}):[]}},{key:"getAllFieldsName",value:function(){var e=this.fieldsMeta;return e?Object.keys(e):[]}},{key:"getValidFieldsFullName",value:function(e){var r=Array.isArray(e)?e:[e];return this.getValidFieldsName().filter(function(t){return r.some(function(e){return t===e||startsWith(t,e)&&0<=[".","["].indexOf(t[e.length])})})}},{key:"getFieldValuePropValue",value:function(e){var t=e.name,r=e.valuePropName,i=this.getField(t);return _defineProperty({},r,fixNullValue("value"in i?i.value:e.initialValue))}},{key:"getField",value:function(e){return _objectSpread({},this.fields[e],{name:e})}},{key:"getNotCollectedFields",value:function(){var t=this;return this.getValidFieldsName().filter(function(e){return!t.fields[e]}).map(function(e){return{name:e,dirty:!1,value:t.getFieldMeta(e).initialValue}}).reduce(function(e,t){return(0,_util.set)(e,t.name,createFormField(t))},{})}},{key:"getNestedAllFields",value:function(){var r=this;return Object.keys(this.fields).reduce(function(e,t){return(0,_util.set)(e,t,createFormField(r.fields[t]))},this.getNotCollectedFields())}},{key:"getFieldMember",value:function(e,t){return this.getField(e)[t]}},{key:"getNestedFields",value:function(e,r){return(e||this.getValidFieldsName()).reduce(function(e,t){return(0,_util.set)(e,t,r(t))},{})}},{key:"getNestedField",value:function(e,r){var t=this.getValidFieldsFullName(e);if(0===t.length||1===t.length&&t[0]===e)return r(e);var i="["===t[0][e.length],n=i?e.length:e.length+1;return t.reduce(function(e,t){return(0,_util.set)(e,t.slice(n),r(t))},i?[]:{})}},{key:"clearField",value:function(e){delete this.fields[e],delete this.fieldsMeta[e]}}]),t}();function createFieldsStore(e){return new FieldsStore(e)}