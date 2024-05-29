/**
 * 翻译
 * @param {*} en 源语言 中文zh-CHS、英文en、日文ja、韩文、ko
 * @param {*} to 目标语言
 * @param {*} text 需要翻译的句子
 */
function BlueLM_translate(en,to,text){
  return new Promise((resolve,reject)=>{
    const headers = require('./gen_sign_headers').gen_Sign_Headers('3035958645',
    'eCiSweWRHcsGivzB','POST','/translation/query/self','https://api-ai.vivo.com.cn/translation/query/self');
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const uuid = require('./uuid').wxuuid();
    wx.request({
      url: 'https://api-ai.vivo.com.cn/translation/query/self',
      header:headers,
      method:'POST',
      data:{
        'from':en,
        'to':to,
        'text':text,
        'app':"test",
        'requestId':uuid,
      },
      success:function(res){
        //console.log(res);
        resolve(res.data.data.translation)
      },
      fail:function(res){
        console.log('失败')
        console.log(res);
      }
    })
  });
}
module.exports={
  BlueLM_translate
}