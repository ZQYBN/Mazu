/**
 * 实时监听data中的数据变化
 * @param {*} ctx 地址
 * @param {*} obj 
 */
function  watch (ctx, obj) {
  Object.keys(obj).forEach(key => {
    observer(ctx.data, key, ctx.data[key], function (value) {
      obj[key].call(ctx, value)
    })
  })
};
// 监听属性，并执行监听函数
function  observer(data, key, val, fn) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      fn && fn(newVal)
      val = newVal
    },
  })
};
module.exports={
  watch
}