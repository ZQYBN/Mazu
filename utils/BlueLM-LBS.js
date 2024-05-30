/**
 * POI搜索
 * @param {*} keywords 关键字
 * @param {*} city 行政区划编码或城市名称
 * @param {*} page_num 当前页数
 * @param {*} page_size 每页条目数
 */
function BlueLM_LBS(keywords,city,page_num,page_size) {
  return new Promise((cg,sb)=>{
    var params = '?keywords='+keywords+'&city='+city+'&page_num='+
    page_num+'&page_size='+page_size;
    const headers = require('./gen_sign_headers').gen_Sign_Headers("3035958645","eCiSweWRHcsGivzB","GET",'/search/geo','https://api-ai.vivo.com.cn/search/geo'+params);
    headers['Content-Type']='application/json';
    wx.request({
      url: 'https://api-ai.vivo.com.cn/search/geo',
      method:'GET',
      header:headers,
      data:{
        'keywords':keywords,
        'city':city,
        'page_num':page_num,
        'page_size':page_size
      },
      success:function (res) {
        cg(res)
      },
      fail:function (res) {
        console.log('失败');
        console.log('res');
      },
    })
  })
}
module.exports={
  BlueLM_LBS
}