
/**
 * AI绘画
 * @param {*} pageInstance 地址
 * @param {*} prompt 正向提示词
 * @param {*} negativePrompt 反向提示词
 * @param {*} styleConfig 模型
 * @param {*} imag 返回地址
 * @param {*} height 图片高度
 * @param {*} width 图片宽度
 * @param {*} seed 随机种子
 * @param {*} imageType 选择生图模式(0：图生图，其他:文生图)
 * @param {*} start 运行转态码，运作中true，结束false
 * @param {*} process 任务进程
 * @param {*} cfgScale 文本相关度
 * @param {*} denoisingStrength 图片相关度
 * @param {*} ctrlNetStrength 控制强度
 * @param {*} steps 采样步数
 * @param {*} int 针对AI对话做出的调整，用于定位多话框的位置
 * @param {*} url 针对传入的是本地路径的图生图做出的跳整
 */
//用于停止请求
var requestTask='';
function BlueMe_AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,start,process,int,url,cfgScale,denoisingStrength,ctrlNetStrength,steps,){
  return new Promise((resolve, reject) => {
    start1(pageInstance,start,true);
    if(imageType==0){
      var img_base64 = require('./img_base64');
      img_base64.img_base64(url).then(base64Data => {
        var base64Data = 'data:image/png;base64,'+base64Data;
        AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,base64Data,process,cfgScale,denoisingStrength,ctrlNetStrength,steps,start,int).then(id =>{
          resolve(id);
        });
      }).catch(error => {
        start1(pageInstance,start,false);
        console.log('出错了')
        console.error(error); 
      }); 
    }
    else{
      AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,'',process,cfgScale,denoisingStrength,ctrlNetStrength,steps,start,int).then(id =>{
        resolve(id);
      });
    }
  });
}
function AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,base64Data,process,cfgScale,denoisingStrength,ctrlNetStrength,steps,start,int){
const headers = qqt("https://api-ai.vivo.com.cn/api/v1/task_submit",'POST','/api/v1/task_submit')
return new Promise((resolve, reject) => {
  process_jc(pageInstance,process,-1,int);
  var task_id = ''
  requestTask = wx.request({
    url: 'https://api-ai.vivo.com.cn/api/v1/task_submit',
    method:'POST',
    data : {
      'prompt':prompt,
      'negativePrompt':negativePrompt,
      'height': height,
      'width': width,
      'styleConfig': styleConfig,
      'seed' : seed,
      'imageType':imageType,//不要传入字符串
      'initImages':base64Data,
      'cfgScale':cfgScale,
      'ctrlNetStrength':ctrlNetStrength,
      'steps':steps,
      'denoisingStrength': denoisingStrength
     },
    header:headers,
    timeout:5000,
    success:function(res){
      if(res.data.code==200){
        console.log(res.data.result);
        resolve( res.data.result.task_id);
        task_id = res.data.result.task_id;
        const headers2 = qqt("https://api-ai.vivo.com.cn//api/v1/task_progress"+"?task_id="+task_id,"GET","/api/v1/task_progress");
        http(pageInstance,imag,'https://api-ai.vivo.com.cn//api/v1/task_progress','GET',task_id,headers2,process,start,int);   
      }   
    },
    fail:function(err){
      start1(pageInstance,start,false);
      console.log('请求失败',err)
    }
  });
  requestTask;
  function http(pageInstance,imag,URL,method,task_id,header,process,start,int){
    wx.request({
      url:URL,
      method:method,
      header:header,
      data:{
        'task_id':task_id,
      },
      timeout:5000,
      success:function(res){
        // console.log('等待人数：'+res.data.result.queue_ahead+'\n'+'预计时间：'+
        // res.data.result.task_eta);
        process_jc(pageInstance,process,res.data.result.status,int);
        if(res.data.result.finished==false){
          setTimeout(function() {
            http(pageInstance,imag,URL,method,task_id,header,process,start,int);           
            return "";
          },700)
        }
        else if(res.data.result.status==2){
          console.log(process,res.data.result.images_url[0]);  
          updateOutput(pageInstance,imag,res.data.result.images_url[0],process,start,int);
        } 
      },
      fail:function(err){
        start1(pageInstance,'start',false);
        console.log('请求失败',err)
      }
    })
  }
    function updateOutput(pageInstance,data,newValue,process,start,int) {
        wx.request({
          url: newValue,
          method: 'GET',
          success: function (res) {
            if (res.statusCode === 200) {
              // console.log(pageInstance);
              // console.log(data);
              // console.log(newValue);
              // console.log(int);
              pageInstance.setData({
                [data]: newValue,
              });
              process_jc(pageInstance,process,'图片链接有效，可以正常打开',int);  
              if(int!=''){
              pageInstance.setData({ 
                  [`chatList[${int}].imag`]: newValue ,
                  [`chatList[${int}].msg`]: '完成啦'
                }); 
              }
              start1(pageInstance,start,false);          
              //console.log('图片链接有效，可以正常打开');
            } else {
              process_jc(pageInstance,process,'图片链接无效，无法打开，重新发送任务',int); 
              AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,base64Data);
              console.log('图片链接无效，无法打开，重新发送任务');
            }
          },
          fail: function (err) {
            process_jc(pageInstance,process,err,int); 
            AIGC(pageInstance,prompt,negativePrompt,styleConfig,imag,height,width,seed,imageType,base64Data);
            console.log(err);
          }
        });
    };
  })
};
function qqt(URL,method,URI){
  const headers = require('./gen_sign_headers').gen_Sign_Headers("3035958645","eCiSweWRHcsGivzB",method,URI,URL);
  headers['content-type'] = 'application/json';
  return headers;
}
function start1(pageInstance,start,boolean){
  if(boolean==true||boolean==false){
    //console.log(pageInstance)
    console.log(boolean);
    //console.log(start)
  };
  pageInstance.setData({
    [start]: boolean,
  });
}
function process_jc(pageInstance,process,status){
  var jc = '';
  switch(status){
    case -1:
      jc = '发送任务';
      break;
    case 0:
      jc = '队列中';
      break;
    case 1:
      jc = '正在处理';
      break;
    case 2:
      jc = '处理完成';
      break;
    case 3:
      jc = '处理失败';
      break;  
    case 4:
      jc = '任务取消';
      break;   
    default:
      jc=status;
      break
  }
  start1(pageInstance,process,jc);
  console.log(jc);
}
/**
 * 
 * @param {*} pageInstance 地址
 * @param {*} task_id 任务id
 */
function cancellation(pageInstance,task_id,start,int){
  const headers = qqt("https://api-ai.vivo.com.cn/api/v1/task_cancel",'POST','/api/v1/task_cancel')
  const uuid = require('./uuid').wxuuid();
  wx.request({
    url: 'https://api-ai.vivo.com.cn/api/v1/task_cancel',
    header:headers,
    timeout:5000,
    method:'POST',
    data:{
      'dataId':uuid,
      'businessCode':'pc',
      'task_id':task_id,
    },
    success: function (res) {
      start1(pageInstance,start,false,int);
    },
    fail:function(err){
      start1(pageInstance,start,false,int);
      console.log('请求失败'+err)
    }
  })
}
function stop() {
  try{
    if(requestTask!=''){
      requestTask.abort()
    }
  }catch(e){
    console.log('还没有进行AI绘画')
  } 
}
module.exports = {
  BlueMe_AIGC,
  cancellation,
  stop,
}