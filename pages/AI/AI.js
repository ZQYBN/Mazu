// pages/AI/AI.js
import tinyCommunityJson from '../..//data/tinyCommunityJson'; 
//获取屏幕的信息
var info = wx.getSystemInfoSync();
const windowHeight = info.windowHeight
var Gaode_tq = require('../../utils/Gaode-tq');
var BlueLM_70B = require('../../utils/BlueLM-70B');
var BlueMe_AIGC = require('../../utils/BlueMe-AIGC');
var i=3;
var wt1 = '妈祖信俗介绍';
var wt2 = '妈祖文创体验';
var wt3 = '我已在湄洲岛'
var wt4 = '了解阿湄'
var  safeAreaBottom ;
const app = require('../../utils/watch')
var ypzt = true;
var uuid = '';
var rx;
var rx1 = '你的名字是湄洲女，是一个精通妈祖知识，会画画，会查看天气以及莆田湄洲岛的小助手。你的名字和任何事物都没有关联。'
var rx2 = '当问题是要你画画时(包括画一个妈祖)，必须回复正在帮您处理画画任务，请稍等。此外回复画画相关的问题时，也需要回复正在帮您处理画画任务，请稍等。当我没有说画这个字时不要回复正在帮您处理画画任务，请稍等。'
var rx3 = '当问题涉及妈祖的问题时，必须合理的回答，要很详细，很正确的，不要回答请稍等子类的。'
var rx4 = ''
// var rx5 = '当问题不涉及妈祖、莆田湄洲岛和画画以及天气的时候，你必须回答不知道哦～'
var rx5 = ""
var height;
var dhk_height;
var input_height;
var canvas_width ;
var canvas_height ;
var dpi ;
Page({
     /**
     * 页面的初始数据
     */
    data: {
      output: '',
      task_id: '',
      imag: 'https://img.zcool.cn/community/01ce015dfd9fe7a801216518430248.jpg@3000w_1l_0o_100sh.jpg',
      defaultAnchors: [150, windowHeight * 0.5],
      chat_height: 0,
      sms: "",//用户消息，
      chatList: tinyCommunityJson.data.rows,//消息列表 
      isloading:'',
      scrollheigt:'100%',
      start:'',
      Button:'',
      yp_src:'../../img/声音1.png',
      clearR: 0,
      clearG: 0,
      clearB: 0,
      clearA: 0,
      heightScale: 0.5,
      cubeAlpha: 100,
      sphereAlpha: 100,
      AI_mzn:'../../img/眉州女.png',
      AI_name:'阿湄'
    },   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.yp()
        var title = options.title
        // 设置标题
        wx.setNavigationBarTitle({
            title: title,
        })

        wx.getSystemInfo({
          success(res) {
            // 获取底部安全区域的高度
             safeAreaBottom = res.screenHeight - res.safeArea.bottom;
          }
        });
        let query = wx.createSelectorQuery();
        //输入栏的高度
        query.select('.input').boundingClientRect(height => {
          input_height = height.height;
          this.setData({
             chat_height: 49+input_height+safeAreaBottom
        })
        xr(this);    
        }).exec();
        app.watch(this,{
          output:function name(data) {
            setTimeout(() => {
              this.setData({
              })        
            }, 0);  
            pageScrollToBottom(this)
          }
        });
        app.watch(this,{
          isloading:function name(data) {
            setTimeout(() => {
              pageScrollToBottom(this)
            }, 0);   
          }
        });
        app.watch(this,{
          task_id:function name(data) {
            setTimeout(() => {
              if(this.data.task_id!=null){
                this.setData({
                  Button:'停止AI绘画'
                });
              }
              else{
                this.setData({
                  Button:'停止响应'
                });
              }
              pageScrollToBottom(this)
            }, 0);  
          }
        });
        //获得天气数据
        Gaode_tq.Gaode_tq('live').then(live=>{
          Gaode_tq.Gaode_tq('forecast').then(forecast=>{
            var data = forecast[0]+live[1]+forecast[2]
            //console.log(data)
             rx4 = '这个天气数据来源高德API，用户问你关于天气数据来源时，要回答高德天气,这个天气的数据的地点为用户自己的定位，你不要在向用户提问关于位置的问题。下面是天气信息：'+'\n'+data+'当我在问你天气的时候，对这个天气数据进行分析,且要把天气的发布时间也说出来，在进行天气的分析时，开车、衣服、游玩、运动、要不要带伞这几个角度分析。'
            })         
          }).catch(sb=>{
            console.log('获得天气数据失败:'+sb)
            rx4 = '天气数据获取失败，用户如果问天气，则必须回带:失败原因：'+sb
          })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
      this.dhk('0',this.data.AI_name,'你好，我是阿湄'+'\n'+'欢迎来到湄洲文旅智能体验中心',this.getCurTime(),this.data.AI_mzn)
      this.dhk('2',this.data.AI_name,'你想要体验什么内容呢？',this.getCurTime(),this.data.AI_mzn,wt1,wt2,wt3,wt4)
      this.setData({
          isdisabled:true
      })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // this.getTabBar().init() // 设置tabbar active状态
        this.getTabBar().setData({
            // 根据list 的索引
            active: "AI"
        })
        //   初始化滑动面板位置
        const floatingPanelRef = this.selectComponent('#wux-floating-panel')
        floatingPanelRef.setHeight(windowHeight * 0.5, { immediate: true })
        //滚动到页面底部
        pageScrollToBottom(this)
    },
    //监控滚动
    onHeightChange(e) {
        if(dhk_height!=e.detail.height){
          dhk_height = e.detail.height;
          //计算模型的高度
          if(input_height!=null&&safeAreaBottom!=null){
            var xr_height = info.windowHeight-dhk_height
            this.setData({
              canvas_width, 
              canvas_height:xr_height,
              renderWidth: canvas_width * dpi,
              renderHeight: xr_height * dpi
            });
          }
          const { height, maxHeight } = e.detail
          const ratio = height / maxHeight
          this.setData({
              height: '100%',
              backgroundImage: `linear-gradient(rgba(195, 213, 227, ${ratio}), rgba(255, 255, 255, ${ratio}))`,
          })
        }
    },
    // 实时获取文本内容
    onChange(event) {
        var zfc  =event.detail;
        this.data.sms = zfc;
        if(zfc.length!=0){
          this.setData({
            isdisabled:false
          })        
        }
        else{
          this.setData({    
            isdisabled:true
          })     
        }     
    },
    // 发送消息
    send_Message: function () {
        var inputValue = this.data.sms
        if (!inputValue) {
            return
        }
        this.dh(inputValue)
    }, 
    dh(inputValue){
      this.setData({
        inputTemp: "",
        imag:'',
        task_id:null
    })    
      this.dhk('1','旅行者',inputValue,this.getCurTime(),'')
      this.dhk('0',this.data.AI_name,'......',this.getCurTime(),this.data.AI_mzn)
      if(rx4==''){
        rx4 = '现在天气信息还没有获取成功，如果用户如果问有关天气的信息，必须回答：天气数据还没用获取到，请稍后再问，'
        rx = rx5+rx4+rx1+rx2+rx3;
      }
      else{
        rx = rx5+rx1+rx2+rx3+rx4;
      }
      //使用过滤器
      glq(inputValue).then(cg=>{
        console.log('i', cg);
        if(cg>=1){
          BlueLM_70B.BlueMe_70B(this,'output',inputValue,20,'isloading',rx,i,uuid,).then(cg=>{
            //不绑定历史对话
            // uuid = cg;
          })
        }else{
         setTimeout(()=>{
          this.setData({
            isloading:true,
            [`chatList[${i-2}].msg`]: '这个问题有点难了，阿湄不会，请问关于妈祖的问题吧'
          })
         },300)
         setTimeout(()=>{
          this.setData({
            isloading:false,
          })
        },500)
        }
        i+=2
      })
      // 清空输入框内容
      this.setData({
          isdisabled:true,
          sms: '' 
        });
    },
    /**
     * 获取当前时间
     */
    getCurTime() {
        var date = new Date()
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = date.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    /**
     * 创建列表
     * @param {*} int 
     * @param {*} name 
     * @param {*} msg 
     * @param {*} photoUrl 
     * @param {*} wt1 
     * @param {*} wt2 
     * @param {*} wt3 
     */
    dhk(int,name,msg,Time,photoUrl,wt1,wt2,wt3,wt4) {
      var that = this;
      var chatObj = {}
      chatObj.type = int
      chatObj.name = name
      chatObj.msg = msg
      chatObj.time = Time;
      chatObj.imag = ''
      chatObj.photoUrl = photoUrl
      chatObj.wt1 = wt1
      chatObj.wt2 = wt2
      chatObj.wt3 = wt3
      chatObj.wt4 = wt4
      var chatList = that.data.chatList
      chatList.push(chatObj);
      that.setData({
          chatList: chatList
      })
    },
    bindKeyInput: function (event) {
        input = event.detail.value;
        // 可以在这里对获取到的输入内容进行处理或保存
        input = input;
    },
    wt1:function (params) {
      this.dh(wt1)
    },
    wt2:function (params) {
      this.dh(wt2)
    },
    wt3:function (params) {
      this.dh(wt3)
    },
    wt:function(e){
      console.log(e)
      switch(e._relatedInfo.anchorTargetText){
        case'妈祖信俗介绍':{
          this.dhk('2',this.data.AI_name,'妈祖信俗介绍',this.getCurTime(),this.data.AI_mzn,'点击进入妈祖信俗介绍界面','请简单介绍一下妈祖信俗')
          i++
          break
        }
        case"妈祖文创体验":{
          this.dhk('2',this.data.AI_name,'妈祖文创体验中心',this.getCurTime(),this.data.AI_mzn,'点击体验妈祖灵签','点击制作AI明信片')
          i++
          break
        }
        case'我已在湄洲岛':{
          this.dhk('2',this.data.AI_name,'我已在湄洲岛上',this.getCurTime(),this.data.AI_mzn,'点击进入湄洲岛地图','湄洲岛的推荐游玩路线')
          i++
          break
        }
        case'了解阿湄':{
          this.dhk('2',this.data.AI_name,'了解阿湄',this.getCurTime(),this.data.AI_mzn,'','')
          i++
          break
        }
        case"点击进入妈祖信俗介绍界面":{
          tz1('../../pages/index/index')
          break
        }
        case"请简单介绍一下妈祖信俗":{
          tz1('../../pages/WenChuang/WenChuang')
          break
        }
        case"点击体验妈祖灵签":{
          tz2('../../pray/pages/pray_main/pray')
          break
        }
        case"点击制作AI明信片":{
          tz2('../../pages/postcard/postcard')
          break
        }
        case"点击进入湄洲岛地图":{
          tz2('../../pages/map/map')
          break
        }
        case"湄洲岛的推荐游玩路线":{
          this.dh('湄洲岛的推荐游玩路线')
          break
        }
        case"湄洲岛的推荐游玩路线":{
          this.dh('湄洲岛的推荐游玩路线')
          break
        }
      }
      pageScrollToBottom(this)
    },
    top:function (params) {
      if(this.data.task_id!=null){
      BlueMe_AIGC.cancellation(this, this.data.task_id,'isloading',i)
      console.log('停止AIGC')
      }
      else{
        BlueLM_70B.stop();
        setTimeout(()=>{
          BlueMe_AIGC.stop();      
        },100)     
        console.log('停止70B')
      }
    },
    yp:function () {
      if(ypzt){
        ypzt = false;
        this.setData({ 
          yp_src:'../../img/声音静音.png'
        })
        BlueLM_70B.yp_stop()
      }
      else{
        ypzt = true;
        this.setData({
          yp_src:'../../img/声音1.png'
        })
        BlueLM_70B.yp_play()
      }
    },

        /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }, 
})

function pageScrollToBottom(pageInstance) {
  var query = wx.createSelectorQuery();
  query.select('#x_chat').boundingClientRect((rect) => {
    if(height==null||height!=rect.height){
      height=rect.height
      pageInstance.setData({
        scrollTop: rect.height,
        duration: 0
      });
    }
   
  }).exec();
}
function xr(pageInstance) {
  //获取设备的宽度
  canvas_width = info.windowWidth;
  //获取设备的高度(不包括顶部的状态栏)
  canvas_height = info.windowHeight-pageInstance.data.defaultAnchors[1];
  console.log('屏幕的高度',info.windowHeight)
  //获取设备的像素比
  dpi = info.pixelRatio;
  pageInstance.setData({
    canvas_width, canvas_height,
    renderWidth: canvas_width * dpi,
    renderHeight: canvas_height * dpi
  });
}
//实现KMP算法
//计算next数组
function next(text){
  return new Promise((cg,sb)=>{
    //初始化next数组
    var next=[]
    //next数组的第一个值为-1
    next.push(-1)
    //分割数组
    var szcd = text.split('')
    //累加值
    var res=''
    //真前缀
    var zqz = []
    //真后缀
    var zhz = []
    //计算真前缀和真后缀
    for(var i=0;i<szcd.length;i++){
      res+=szcd[i]
      var cf = res.slice('')
      var res_qz = ''
      var res_qz_sz=[]
      var res_hz = ''
      var res_hz_sz=[]
      var int = cf.length-1
      var b=0
      for(var a =0;a<int;a++){
        res_qz+=cf[a]
        res_hz=cf[int-a]+res_hz
        if(res_qz==res_hz){
          b = res_qz.length
        }
        // res_qz_sz.push(res_qz)
        // res_hz_sz.push(res_hz)
      }
      next.push(b)
      // zqz.push(res_qz_sz)
      // zhz.push(res_hz_sz)
    }
    // console.log('真前缀',zqz)
    // console.log('真后缀',zhz)
    // console.log('next',next)
    cg(next)
  })
}
function KMP(text,text2,next) {
  return new  Promise((cg,sb)=>{
    //分割字符串
    var fgsz = text.split('')
    var objet = text2.split('')
    var text_int = 0
    var next_int = 0
    while (text_int<=fgsz.length-1) {
      //字符串匹配时
      if(fgsz[text_int]==objet[next_int]){
        if(next_int==objet.length-1){
          console.log('相等的末尾位置',text_int-1)
          //有相等的字符串,退出字符串
          text_int = fgsz.length
          cg(1)
        }
        text_int++
        next_int++
      }
      //字符串不匹配时
      else{
        //获取next跳转数组里的数值
        //next[next_int]为跳转值
        var tz =next[next_int]
        if(tz==-1){
          text_int++
          next_int=0
        }
        //有部分相等
        else{
          while(tz!=-1){
            if(objet[tz]!=fgsz[text_int]){
              tz = next[tz]
              if(tz==-1){
                text_int++
                next_int=0
              }
            }
            //如果相等
            else if(objet[tz]==fgsz[text_int]){
              //退出循环，指针从这里开始继续往下遍历
              next_int = tz
              tz=-1
            }       
          } 
        }
      }     
    }
    if(next_int!=objet.length){
      console.log('不相等')
      cg(0)
    }
  })
}
 function glq(text) {
  return new Promise((resolve, reject) => {
    var jsq = 0;
    // 使用Promise.all来等待所有异步操作完成
    Promise.all([
      next('天气').then((cg) => KMP(text, '天气',cg)).then(cg => {
        jsq += cg;
      }),
      next('画').then((cg) => KMP(text, '画',cg)).then(cg => {
        jsq += cg;
      }),
      next('妈祖').then((cg) => KMP(text, '妈祖',cg)).then(cg => {
        jsq += cg;
      }),
      next('湄洲').then((cg) => KMP(text, '湄洲',cg)).then(cg => {
        jsq += cg;
      }),
      next('你好').then((cg) => KMP(text, '你好',cg)).then(cg => {
        jsq += cg;
      }),
      next('名字').then((cg) => KMP(text, '名字',cg)).then(cg => {
        jsq += cg;
      }),
      next('叫').then((cg) => KMP(text, '叫',cg)).then(cg => {
        jsq += cg;
      })
    ]).then(() => {
      resolve(jsq); // 所有异步操作完成后，返回i的值
    }).catch(reject); // 如果有任何一个Promise失败了，则捕获错误
  });
 }
 function tz1(url){
    wx.switchTab({
      url: url
  })
 }
 function tz2(url){
  wx.navigateTo({
    url: url
  });
 }