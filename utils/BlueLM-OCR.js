/**
 * 识别文字
 * @param {*} img_base64 图片b64编码
 * @param {*} pos 可取值为0、1、2。0代表只需要文字信息；1代表提供文字信息和坐标信息（坐标绝对值）；2代表将0和1的信息同时提供（坐标为相对值），建议取pos=2
 * @param {*} businessid 1990173156ceb8a09eee80c293135279，支持旋转图像、非正向文字识别
  8bf312e702043779ad0f2760b37a0806，只支持正向文字识别，耗时比1990小
 */
function BlueLM_OCR(img_base64,pos,businessid){
  //console.log(img_base64);
 var base64Data = img_base64;
 //console.log(base64Data);
  return new Promise((resolve,reject)=>{
    var headers = require('./gen_sign_headers').gen_Sign_Headers("3035958645", "eCiSweWRHcsGivzB", 'POST', '/ocr/general_recognition','http://api-ai.vivo.com.cn/ocr/general_recognition');
     headers['content-type'] = 'application/x-www-form-urlencoded';
    wx.request({
      url: 'http://api-ai.vivo.com.cn/ocr/general_recognition',
      header:headers,
      method:'POST',
      data:{
          'image':base64Data,
          'pos':pos,
          'businessid' :businessid,
      },
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        console.log(res);
      },
    })
  })
}
module.exports={
  BlueLM_OCR
}