var amapFile = require('../utils/amap-wx.130');
var city
var humidity
var province
var reporttime
var temperature
var weather
var winddirection
var windpower
var data_head;
let shouldCancel = true; // 外部控制标志
var data_body_live = '实现天气信息:' + '\n'
var data_body_forecast = '预报天气信息:' + '\n'
/**
 * 
 * @param {*} type live实时天气；forecast预报天气
 */
function Gaode_tq(type) {
    shouldCancel = true;
    return new Promise((cg, sb) => {
        if (shouldCancel == false) {
            sb('停止查询天气'); // 如果已经取消，则立即拒绝Promise
            shouldCancel = true;
            return;
        }
        var myAmapFun = new amapFile.AMapWX({ key: '28e5753d7b24f3de310525dfb3f4db6f' });
        myAmapFun.getWeather({
            type: type,
            success: function (data) {
                //实时消息
                if (type == 'live') {
                    city = data.liveData.city//城市
                    humidity = data.liveData.humidity//湿度
                    province = data.liveData.province//省份
                    reporttime = data.liveData.reporttime//天气的发布时间
                    temperature = data.liveData.temperature//温度
                    weather = data.liveData.weather//气候
                    winddirection = data.liveData.winddirection//风向
                    windpower = data.liveData.windpower//风力级别
                    data_body_live +=
                        '气候:' + weather + '\n' +
                        '温度:' + temperature + '\n' +
                        '湿度:' + humidity + '\n' +
                        '风向:' + winddirection + '\n' +
                        '风力级别:' + windpower + '\n\n'
                }
                //预报消息
                else if (type == 'forecast') {
                    city = data.forecast.city//城市
                    province = data.forecast.province//省份
                    reporttime = data.forecast.reporttime//天气的发布时间
                    var forecast_xx = data.forecast.casts;
                    data_head =
                        '省份:' + province + '\n' +
                        '市区:' + city + '\n' +
                        '天气的发布时间' + reporttime + '\n\n';
                    for (var i = 0; i < forecast_xx.length; i++) {
                        data_body_forecast +=
                            '星期:' + forecast_xx[i].week + '\n' +
                            '日期:' + forecast_xx[i].date + '\n' +
                            '白天天气:' + forecast_xx[i].dayweather + '\n' +
                            '晚上天气:' + forecast_xx[i].nightweather + '\n' +
                            '白天温度:' + forecast_xx[i].daytemp + '\n' +
                            '晚上温度' + forecast_xx[i].nighttemp + '\n' +
                            '白天风力' + forecast_xx[i].daypower + '\n' +
                            '白天风向' + forecast_xx[i].daywind + '\n' +
                            '晚上风力' + forecast_xx[i].nightpower + '\n' +
                            '晚上风向' + forecast_xx[i].nightwind + '\n' + '\n'
                    }
                }
                if (shouldCancel == false) {
                    sb('停止查询天气'); // 检查是否取消，如果是，则拒绝Promise
                    shouldCancel = true;
                    return;
                }
                cg([data_head, data_body_live, data_body_forecast])
            },
            fail: function (info) {
                var cw = info.errMsg;
                var cwxxksh;
                if (cw == 'request:fail timeout') {
                    cwxxksh = '请求超时'
                }
                else if (cw == 'request:fail abort') {
                    cwxxksh = '请求被终止';
                }
                else if (cw = 'request:fail ssl hand shake error') {
                    cwxxksh = '握手失败,请检查您的代理'
                }
                else if (cw = 'request:fail connect error') {
                    cwxxksh = '网络连接错误请检查网络'
                }
                else if (cw = 'request:fail response error code') {
                    cwxxksh = '表示服务器返回了错误的HTTP状态码'
                }
                else {
                    cwxxksh = '遇到未知力量'
                }
                //失败回调
                sb(cwxxksh)
            }
        })
    })
}
function stop() {
    console.log('停止天气')
    shouldCancel = false;
}
module.exports = {
    Gaode_tq,
    stop
}