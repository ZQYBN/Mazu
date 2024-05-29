/**
 * 
 * @param {*} text 要合成的文本内容，限制为1000字符。支持ssml标记语言
 * @param {*} speaker 合成音频指定发音人
 * @param {*} audio_type 合成音频的格式
 * @param {*} speed 发音人合成的语速，支持小数点后两位
 * @param {*} convert 默认值：无、可选值：robot、是否转化为机器声
 * @param {*} rate 音频采样率、默认值：无，由speaker指定默认值、可选值：8000/16000/24000
 * @param {*} volume 合成音量、默认值：1.0、可选值：0.1-1.0
 * @param {*} pitch 语调参数，参数小于0则语调变低，反之则高、默认值：0、可选值：-10<pitch<10、(streaming接口不支持)
 * @param {*} symbol_sil 符号停顿时长映射方法（逗号分割)见下方停顿符号映射表、充值后自动开通权限、(streaming接口不支持)
 * @param {*} ignore_limit 默认值：false、可选值：false/true、是否限制字符数，如果设置true，传输、文本可以超过1000字符限制，最大字符数3000、充值后自动开通权限
 * @param {*} gen_srt 可以控制是否生成对应的srt字幕文件
 * @param {*} merge_symbol 粗粒度合成参数，默认为false。可以指定为true，打开后语气停顿会更加接近真人效果。
 * @param {*} srt_len 生成字幕的最大长度
 * @param {*} streaming 是否流式输出，默认为false。可以指定为true，打开后ignore_limit 为true且audio_type 不为wav时，接口流式输出
 */
function mankey_TTS(text,speaker,audio_type,speed,convert,rate,volume,pitch
  ,symbol_sil,ignore_limit,gen_srt,merge_symbol,srt_len,streaming) {
  var appkey = '290AF3B8F7F1733C39F3C213FBFD7071'
  var AppSecret  ='6B27FE47D09EFF959E28CDEBA6CD3D09';
  var time = getUTCTime();
  const signature = appkey+'+'+AppSecret+'+'+ time;
  const md5 = require('./md5');
  const signature_md5 = md5.hexMD5(signature)
  console.log(signature);
  const header={
    "Content-Type": "application/json"
  };
  wx.request({
    url: 'https://open.mobvoi.com/api/tts/v1',
    method:'POST',
    header:header,
    data:JSON.stringify({
      'text':text,
      'appkey':appkey,
      'signature':signature_md5,
      'timestamp':time,
      'speaker':speaker,
      'audio_type':'pcm',
      'speed':speed,
      'convert':convert,
      'rate':rate,
      'volume':volume,
      'pitch':pitch,
      'symbol_sil':symbol_sil,
      'ignore_limit':ignore_limit,
      'gen_srt':gen_srt,
      'merge_symbol':merge_symbol,
      'srt_len':srt_len,
      'streaming':streaming
    }),
    success:function name(params) {
      console.log(params.data);
    },
    fail:function name(params) {
      console.log(params);
    }
  })
}
// 请求时的Unix时间戳，以秒为单位
function getUTCTime() {
  var currentDate = new Date();
  var utcTimestamp = Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds()
  ) / 1000; // 将毫秒转换为秒
  return utcTimestamp;
}

module.exports={
  mankey_TTS
}