//function是就是语法的用来定义函数的关键字、
var Gaode_tq = require('../utils/Gaode-tq');
var BlueMe_AIGC = require('../utils/BlueMe-AIGC.js');
var BlueMe_TTS = require('../utils/BlueLM-TTS');
var requestTask='';
//将音频的播放实例化，用来停止播放音频
var audioPlayer ='';
//用于判断是否播放音频
var yp =true;
var uuid='';
/**
 * AI对话
 * @param {*} pageInstance 表示调用改模块的js地址，使用this传入
 * @param {*} data 是自定义的变量名称，BlueMe_70B通过改变调用者的data实现流式响应的返回值处理，使用'xxx'传入
 * @param {*} input 输入值
 * @param {*} time 控制AI打字的速度，单位是ms
 * @param {*} start 响应的状态码
 * @param {*} systemPrompt 人设
 * @param {*} int AI对话的数组序号
 * @param {*} uuid uuid用来实现历史的对话
 * @param {*} max_new_tokens 生成答案的最大字数
 */
function BlueMe_70B(pageInstance,data,input,time,start,systemPrompt,int,uuid,max_new_tokens){
  return new Promise((cg,sb)=>{
    //设置状态
    start_(pageInstance,start,true);
    //require 函数用来加载模块
    //计算uuid，uuid是是一种标准化的用于表示数据对象的128位数值。
    if(uuid==''||uuid==null){
     uuid = require('./uuid').wxuuid();
    }
    //计算请求头标签
    //id 和 秘钥
    var app_id = "3035958645";
    var app_key = "eCiSweWRHcsGivzB";
    //HTTP网络的请求方式，有POST和GET等
    var Method = "POST";//必须使用全大写的形式
    //URI（Uniform Resource Identifier，统一资源标识符）是用于标识和定位互联网上的资源的字符串序列。
    var URI = "/vivogpt/completions/stream";
    //URL（统一资源定位符）：URL是URI的一种特定类型，它不仅标识了资源的位置，还指定了如何访问该资源。
    var URL = "https://api-ai.vivo.com.cn/vivogpt/completions/stream"
    //拼接完整的地址
    var urlWithRequestId = URL+"?requestId="+uuid
    //计算请求头签名
    var headers =  require('./gen_sign_headers').gen_Sign_Headers(app_id, app_key, Method, URI,urlWithRequestId);
    //定义一个字符串用来存储返回值
    let res = '';
    //给请求头签名添加键值对'content-type'：'application/json'用来指定数据的类型
    headers['content-type'] = 'application/json';
    //使用微信的API发送HTTP请求
    try{
    requestTask= wx.request({
        //地址
        url: urlWithRequestId,
        //请求方法
        method:Method,
        //启用流式响应
        enableChunked: true,
        //请求体
        data: {
          'prompt': input,
          'model': 'vivo-BlueLM-TB',
          'sessionId': uuid,
          'requestId:': uuid,
          'systemPrompt':systemPrompt,
          'extra': {
              'top_p':0.01,
              'max_new_tokens':max_new_tokens
            },
            'message':[""],
          },
          //设置响应的超时时间
          timeout:10000,
          //请求头
          header:headers,
          //异步接收请求结果
          success:function(){
            //返回uuid实现历史对话
            cg([uuid,res]);
            if(int!=null&&int!=''){
              //生成音频
              BlueMe_TTS.BlueLM_TTS('short_audio_synthesis_jovi','intp65',0,'audio/L16;rate=24000audio/L16;rate=24000','xiaofu',50,50,50,2,0,res,'utf8',0,'',513722013).then(data=>{
                BlueMe_TTS.decode(data,'xiaofu').then(cg=>{
                  if(yp){
                    audioPlayer=BlueMe_TTS.play(cg)
                  }           
                })
              })
              //AI绘画
              if(res=='正在帮您处理画画任务，请稍等。'||res=='正在帮您处理妈祖AI绘画，请稍等。'||res=='正在为您处理画画任务，请稍等。'
              ||res=='正在为您生成妈祖的AI绘画，请稍等。'||res=='正在为您查询妈祖的AI绘画，请稍等。'||res=='好的，我会为您生成一张妈祖的AI绘画。请稍等。'){
                BlueMe_AIGC.BlueMe_AIGC(pageInstance, input, '', '85ae2641576f5c409b273e0f490f15c0', 'imag',
                '512', '512', '-1', 1, 'isloading','',int).then(id=>{
                  pageInstance.setData({ 
                    ['task_id']: id 
                  }); 
                }) 
                // start_(pageInstance,start,false);
              }
              else{
                console.log(res)
                start_(pageInstance,start,false);
              }
            }
            else{
              start_(pageInstance,start,false);
            }
          },
          //请求失败
          fail:function(err){
            var cw = err.errMsg;
            var cwxxksh;
            if(cw=='request:fail timeout'){
              cwxxksh = '请求超时'
            }
            else if(cw=='request:fail abort'){
              cwxxksh = '请求被终止';
            }
            else if(cw='request:fail ssl hand shake error'){
              cwxxksh = '握手失败,请检查您的代理'
            }
            else if(cw='request:fail connect error'){
              cwxxksh = '网络连接错误请检查网络'
            }
            else if(cw='request:fail response error code'){
              cwxxksh = '表示服务器返回了错误的HTTP状态码'
            }
            else{
              cwxxksh = '遇到未知力量'
            }
            if(cwxxksh!='请求被终止'){
              if(int!=''&&int!=null){
                pageInstance.setData({ 
                  [`chatList[${int}].msg`]: cwxxksh 
                })
              }
              else{
                updateOutput(pageInstance,data,cwxxksh);
              }
            }
            start_(pageInstance,start,false);
          }
      })
      //为了处理流式响应的结果，需要使用到微信API里的onChunkReceived
      //onChunkReceived用于处理接收到的数据块（chunks）
      requestTask.onChunkReceived(function (chunk) {
        //使用TextDecoder会遇到兼用问题
        // 将 Uint8Array 直接转换为字符串会中文乱码
        const uint8Array = new Uint8Array(chunk.data);
        // 将Uint8Array转换为二进制字符串
        //使用reduce遍历uint8Array里的每一个值
        //acc累加器、byte表示表示当前的元素
        const binaryString = uint8Array.reduce((acc, byte) =>{
          //String.fromCharCode() 方法接受一个 Unicode 值，并返回对应的字符。
          acc += String.fromCharCode(byte); 
          return acc;
        }, '');
        // 使用unescape和encodeURIComponent转换为正常的字符串
        const text = decodeURIComponent(escape(binaryString));
        const lines = text.split('\n');
        for (let line of lines) {
          //判断是否是以event:close为头或者数据是data:[DONE]如果是，则忽略
          if (line.startsWith('event:close')||line=='data:[DONE]') {
            //跳过本次循环
            continue;
          }
          else if(line.startsWith('event:error')){
            console.log(line);
            continue;
          }
          else if(line.startsWith('data:使用的人太多啦，请稍后再试～')){
            if(int!=false){     
              pageInstance.setData({
                [`chatList[${int}].msg`]: 'data:使用的人太多啦，请稍后再试～'
              });
            } 
            res='data:使用的人太多啦，请稍后再试～'
            continue;
          }
            if (line.startsWith('data:')) {
              // 移除 "data:" 前缀
              let jsonText = line.substring(5);   
              try {
                //将jsonText转变成为JSOn
                let dataObject = JSON.parse(jsonText);
                res += dataObject.message;    
                if(int!=''&&int!=null){
                  pageInstance.setData({
                    [`chatList[${int}].msg`]: res
                  });
                  updateOutput(pageInstance,data,res);
                }else{
                  updateOutput(pageInstance,data,res);
                }                     
                //调用睡眠函数，控制for一次循环的时间单位毫秒
                sleep(time);
              } 
              catch (e) {
                console.error("JSON parsing error:", e);
              }
            } 
          }
      });
    }
    catch(e){
      start_(pageInstance,start,false);
    }
    /**
     * 
     * @param {*} pageInstance 地址
     * @param {*} data 数据名
     * @param {*} newValue 数据值
     */
    function updateOutput(pageInstance, data,newValue) {
      pageInstance.setData({
        [data]: newValue,   
      });
    };
    function start_(pageInstance,start,boolean){
      pageInstance.setData({
        [start]: boolean,
      });
    };
    /**
     *  睡眠函数
     *  @param numberMillis -- 要睡眠的毫秒数
     */
    function sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
              return;
      }
    }
  })
}

function stop() {
  requestTask.abort()
  Gaode_tq.stop();
}
function yp_stop(params) {
  yp=false;
  if(audioPlayer!=""){
    try{
    audioPlayer.stop()
    }
    catch(e){
      console.log('找不到路径')
    }
  }
  else{
    console.log('未定义')
  }  
}
function yp_play(params) {
  yp =true;
  audioPlayer=BlueMe_TTS.play('xiaofu')
}

module.exports = {
  BlueMe_70B,
  stop,
  yp_stop,
  yp_play,
}



