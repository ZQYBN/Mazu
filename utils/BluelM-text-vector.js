/**
 * 文本向量
 * @param {*} model 文本向量化模型名称，当前支持：bge-base-zh、m3e-base、all-mpnet-base-v2
  bge-base-zh(近期开源很优秀的模型，擅长中文的召回场景，即较短的query召回较长的文本。query前面需 要加上instruction：“为这个句子生成表示以用于检索相关文章：”。介绍见https://huggingface.co/BAAI/bge-base-zh);
  m3e-base(近期开源很优秀的模型，擅长中文的文本比对场景，介绍见https://huggingface.co/moka-ai/m3e-base);
  all-mpnet-base-v2(只支持英文，介绍见https://huggingface.co/sentence-transformers/all-mpnet-base-v2);
 * @param {*} sentences 需要向量化文本的JSON格式数组
 */
function BlueLM_text_vector(model,sentences){
  return new Promise((cg,sb)=>{
    const headers = require('./gen_sign_headers').gen_Sign_Headers('3035958645',
    'eCiSweWRHcsGivzB','POST','/embedding-model-api/predict/batch','https://api-ai.vivo.com.cn/embedding-model-api/predict/batch');
    headers['Content-Type']='application/json';
    wx.request({
      url: 'https://api-ai.vivo.com.cn/embedding-model-api/predict/batch',
      method:"POST",
      header:headers,
      data:{  
        'model_name':model,
        'sentences':sentences
      },
      success:function(res) {
        cg(res);
      },
      fail:function (res) {
        console.log('失败')
        console.log(res);
      },
    })
  })
}
module.exports={
  BlueLM_text_vector
}