/**
 * 
 * @param {*} engineid(是 String) 短音频合成：short_audio_synthesis_jovi
  长音频合成：long_audio_synthesis
 * @param {*} ent(否 String) 引擎类型，可选值： aisound（普通效果） intp65（中英文） intp65_en（纯英文） xtts（优化效果） 默认为intp65
 * @param {*} aue(是 int) 自研音频的格式：0：pcm 1: opus压缩，自研版本
 * @param {*} auf(是 String) 音频采样率，audio/L16;rate=24000：合成24K 的音频
 * @param {*} vcn(是 String) 角色发音人
 * @param {*} speed(否 int) 语速，可选值：[0-100]，默认为50
 * @param {*} volume(否 int)  音量，可选值：[1-100]，默认为50
 * @param {*} pitch(否 int)  音高，对引擎不生效，默认为50
 * @param {*} reg(否 int)  	设置英文发音方式： 0：自动判断处理，如果不确定将按照英文词语拼写处理（缺省） 1：所有英文按字母发音 2：自动判断处理，如果不确定将按照字母朗读 默认按英文单词发音
 * @param {*} rdn(否 int)  合成音频数字发音方式 0：自动判断（默认值） 1：完全数值 2：完全字符串
 * @param {*} text(是 String) 文本内容，需进行base64编码； base64编码前最大长度2048字节	
 * @param {*} encoding(是 String) 文本的编码格式，一律采用utf8
 * @param {*} sfl(否 int) 返回音频的方式：0:流式（默认值）1:按标点分段
 * @param {*} ctl(否 JSON) 	控制参数
 * @param {*} reqId(是 long) 请求ID
 */
function BlueLM_TTS(engineid,ent,aue,auf,vcn,speed,volume,pitch,reg,rdn,text,encoding,sfl,ctl,reqId) {
  return new Promise((cg,sb)=>{
    //当前时间戳，精确到秒
    var system_time = require('./unix').getUTCTime();
    //用户id
    var user_id='123';
    //手机外部型号
    var model='V1809A';
    //内部机型名
    var product='PD1809';
    //应用包名
    var package1 ='com.vivo.agent';
    //	应用版本号
    var client_version = '0'
    //手机系统版本号
    var system_version='0';
    //sdk版本号
    var sdk_version='0';
    // android系统版本号
    var android_version='9';
    
    //TextDecoder
    // decodeURIComponent(escape(String.fromCharCode(...['需解码的内容替换'])));
    //TextEncoder
    const buffer = unescape(encodeURIComponent(text)).split("").map(val => val.charCodeAt());
    const base64 = wx.arrayBufferToBase64(buffer);
    const url  = 'wss://api-ai.vivo.com.cn/tts'+'?engineid='+engineid+
    '&system_time='+system_time+'&user_id='+user_id+'&model='+model+'&product='+product+'&package='+package1+'&system_version='+system_version+'&sdk_version='+sdk_version+'&android_version='+android_version+'&client_version='+client_version;
    const headers =require('./gen_sign_headers').gen_Sign_Headers('3035958645','eCiSweWRHcsGivzB','GET','/tts',url);
    headers['void'] = '123456789';
    let audio_buff =''
    //发送Websocket请求
  // 创建一个 WebSocket 连接
    wx.connectSocket({
      url: url,
      header:headers,
      model:'GET',
      success(res) {
        //console.log('WebSocket 连接成功');
      },
      fail(err) {
        console.log(err);
        console.error('WebSocket 连接失败', err);
      }
    });

    // 监听 WebSocket 连接打开事件
    wx.onSocketOpen(function() {
      console.log('WebSocket 连接已打开'); 
      // 发送数据
      wx.sendSocketMessage({
        data:JSON.stringify({
          'ent':ent,
          'aue':aue,
          'auf':auf,
          'vcn':vcn,
          'speed':speed,
          'volume':volume,
          'pitch':pitch,
          'reg':reg,
          'rdn':rdn,
          'text':base64,
          'encoding':encoding,
          'sfl':sfl,
          'ctl':ctl,
          'reqId':reqId,
        }),
        success() {
          //console.log('发送数据');
        },
        fail(err) {
          console.error('发送数据失败', err);
        }
      });
    });
    // 监听 WebSocket 接收消息事件
    wx.onSocketMessage(function(res) {
      var json = JSON.parse(res.data);
      if(json.data!=null){
        //console.log(json);
        audio_buff+=json.data.audio;
        if(json.data.status==2){
          // 数据接收完毕，主动关闭 WebSocket 连接
          wx.closeSocket({
            success() {
              cg(audio_buff);
              //console.log('已经完成');
            },
            fail(err) {
              console.error('关闭连接失败', err);
            }
          });
        }
      }
      else if(json.error_code==0){
        //console.log('发送数据成功');
      }
    });
    // 监听 WebSocket 错误事件
    wx.onSocketError(function(err) {
      console.error('WebSocket 出现错误', err);
    });

    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(function() {
      console.log('WebSocket 连接已关闭');
    });
  })
}
/**
 * 
 * @param {*} engineid(是 String) 短音频合成：short_audio_synthesis_jovi
  长音频合成：long_audio_synthesis
 * @param {*} ent(否 String) 引擎类型，可选值： aisound（普通效果） intp65（中英文） intp65_en（纯英文） xtts（优化效果） 默认为intp65
 * @param {*} aue(是 int) 自研音频的格式：0：pcm 1: opus压缩，自研版本
 * @param {*} auf(是 String) 音频采样率，audio/L16;rate=24000：合成24K 的音频
 * @param {*} vcn(是 String) 角色发音人
 * @param {*} speed(否 int) 语速，可选值：[0-100]，默认为50
 * @param {*} volume(否 int)  音量，可选值：[1-100]，默认为50
 * @param {*} pitch(否 int)  音高，对引擎不生效，默认为50
 * @param {*} reg(否 int)  	设置英文发音方式： 0：自动判断处理，如果不确定将按照英文词语拼写处理（缺省） 1：所有英文按字母发音 2：自动判断处理，如果不确定将按照字母朗读 默认按英文单词发音
 * @param {*} rdn(否 int)  合成音频数字发音方式 0：自动判断（默认值） 1：完全数值 2：完全字符串
 * @param {*} text(是 String) 文本内容，需进行base64编码； base64编码前最大长度2048字节	
 * @param {*} encoding(是 String) 文本的编码格式，一律采用utf8
 * @param {*} sfl(否 int) 返回音频的方式：0:流式（默认值）1:按标点分段
 * @param {*} ctl(否 JSON) 	控制参数
 * @param {*} reqId(是 long) 请求ID
 */
function decode(data,name) {

  return new Promise((cg,sb)=>{
    // Int8Array是一个类型化数组（TypedArray），它存储的是8位整数（有符号的）。
    // Uint8Array也是一个类型化数组，存储的是8位整数（无符号的）。处理音频或图像文件，通常会使用Uint8Array。
    // Int16Array是存储16位整数的类型化数组。
    // Int32Array是存储32位整数的类型化数组。
    // ArrayBufferByteLength属性显示了 ArrayBuffer 的字节长度，这里是 13024 字节。
    // ArrayBufferData属性包含 ArrayBuffer 内容的十六进制表示。
    //使用wx.base64ToArrayBuffer将base64转变成为二进制
    let arrayBuffer = wx.base64ToArrayBuffer(data);
    //console.log(arrayBuffer);
    const pcmData  = new Uint8Array(arrayBuffer);
   // console.log(pcmData .length); // 输出二进制数据
    //创建WAV头文件
    const wavHeader =createWAVHeader({
      numFrames:pcmData .length,
      numChannels: 1, // 声道
      sampleRate: 24000, // 采样率
      bytesPerSample: 2 // 位深
    })
    //输出头文件
    //console.log(wavHeader);
    //将wav头文件和pcm二进制编码组合在一起
    const wavBytes = new Uint8Array(wavHeader.byteLength + pcmData.byteLength);
    wavBytes.set(new Uint8Array(wavHeader), 0);
    wavBytes.set(pcmData, wavHeader.byteLength);
    //console.log(wavBytes);
    bc(wavBytes,name).then(data=>{
      console.log(data);
      cg(name);
    });
  })
}
//文件头与PCM音频数据合并，才可以创建一个完整的WAV文件
//建一个符合WAV文件格式规范的文件头
function createWAVHeader(opts) {
  //音频帧的数量
  const numFrames = opts.numFrames;
  //音频通道数
  const numChannels = opts.numChannels || 1;
  //音频采样率
  const sampleRate = opts.sampleRate || 24000;
  // 每个采样的字节数
  const bytesPerSample = opts.bytesPerSample || 2;
  //每个音频帧的字节数,等于通道数乘以每个采样的字节数。
  const blockAlign = numChannels * bytesPerSample;
  //每秒传输的字节数，等于采样率乘以每个音频帧的字节数。
  const byteRate = sampleRate * blockAlign;
  //音频数据部分的大小，等于音频帧的数量乘以每个音频帧的字节数。
  const dataSize = numFrames * blockAlign;
  //创建一个固定长度的原始二进制数据缓冲器
  const buffer = new ArrayBuffer(44);
  //DataView 提供了一个低级接口来读写 ArrayBuffer 的内容。
  const dv = new DataView(buffer);
  //p 变量用于跟踪当前的写入位置
  let p = 0;

  function writeString(s) {
      for (let i = 0; i < s.length; i++) {
          dv.setUint8(p + i, s.charCodeAt(i));
      }
      p += s.length;
  }

  function writeUint32(d) {
      dv.setUint32(p, d, true);
      p += 4;
  }
  function writeUint16(d) {
      dv.setUint16(p, d, true);
      p += 2;
  }
  writeString('RIFF');              // 固定字符串，表示这是一个RIFF格式的文件。
  writeUint32(dataSize + 36);       // 文件大小减去8字节的RIFF描述和自身的大小。
  writeString('WAVE');              // 格式类型，表示这是一个WAVE格式的音频文件。
  writeString('fmt ');              // 表示接下来是格式描述子块。
  writeUint32(16);                  // 表示格式描述的大小（16字节）。
  writeUint16(1);                   // 音频格式，PCM格式为1。
  writeUint16(numChannels);         // 通道数
  writeUint32(sampleRate);          // 采样率。
  writeUint32(byteRate);            // 每秒字节数
  writeUint16(blockAlign);          // 块对齐（每个采样的字节数乘以通道数）。
  writeUint16(bytesPerSample * 8);  // 位深，每个采样的位数。
  writeString('data');              // 数据子块ID，表示接下来是音频数据。
  writeUint32(dataSize);            // 音频数据的大小。
  return buffer;
}
function bc(wavBytes,name) {
  return new Promise((cg,sb)=>{
    // 假设wavBytes是您已经组合好的WAV文件的二进制数据
    const fs = wx.getFileSystemManager();
    const filePath = `${wx.env.USER_DATA_PATH}/${name}.wav`;
    // 写入文件
    fs.writeFile({
      filePath: filePath,
      data: wavBytes.buffer, // 注意这里使用了ArrayBuffer
      encoding: 'binary',
      success: function () {
        // console.log('临时文件路径：', filePath);
        cg(filePath)
        // 如果需要，可以在这里使用wx.saveFile将文件保存到用户的设备上
        // wx.getFileSystemManager().saveFile({
        //   tempFilePath: filePath,
        //   success: function (res) {
        //     const savedFilePath = res.savedFilePath;
        //     console.log('文件已保存到设备', savedFilePath);
        //   },
        //   fail: function (err) {
        //     console.error('文件保存到设备失败', err);
        //   }
        // });
      },
      fail: function (err) {
        console.error('WAV文件保存失败', err);
      }
    });
  })
}
function play(name) {
  // 创建 InnerAudioContext 实例
  const innerAudioContext = wx.createInnerAudioContext();
  // 设置音频文件路径
  try{
  innerAudioContext.src = `${wx.env.USER_DATA_PATH}/${name}.wav`;
  }
  catch(e){
    console.log('找不到路径')
  }
  // 播放音频播放
  innerAudioContext.play();
  // 监听播放错误事件
  innerAudioContext.onError((res) => {
    console.log('播放错误')
    console.log(res.errMsg);
    console.log(res.errCode);
  });
    // 返回innerAudioContext以便外部可以控制播放器
    return innerAudioContext;
}
module.exports={
  BlueLM_TTS,
  decode,
  play
}