
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      height: "900"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const windowHeight = wx.getSystemInfoSync().windowHeight
      const systemInfo = wx.getSystemInfoSync();
      // 状态栏高度 
        // 状态栏高度 
      // 状态栏高度 
        // 状态栏高度 
      // 状态栏高度 
      let statusBarHeight = systemInfo.statusBarHeight
      // 标题栏高度
      let titleHeight = 46
      this.setData({
          // height: windowHeight-statusBarHeight-titleHeight
          height: windowHeight
      })
  }
  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  ,
  onReady() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
      // this.getTabBar().init() // 设置tabbar active状态
      this.getTabBar().setData({
          // 根据list 的索引
          active: "Home"
      })
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

  click_pray: function () {
      console.log("点击了线上抽签")
      wx.navigateTo({
          url: '/pray/pages/pray_main/pray',
      })
  },
  click_wish: function () {
      console.log("点击了云端祈福")
      wx.navigateTo({
          url: '/pages/pray/pray_input/pray_in',
      })
  },
  click_postcard: function () {
      console.log("点击了明信片")
      wx.navigateTo({
          url: '/postcard/pages/postcard/postcard',
      })
  },
  click_dianyun: function () {
      console.log("点击了祖庙点云")
      // wx.navigateTo({
      //     url: '/pages/main/culture/mazu',
      // })
      wx.navigateTo({
          url: '../out/LianHeGuo?src=' + encodeURIComponent("http://xmutsrsc.com/PointCloud/MZDLAZ1/"),
        })
  },
  click_temple_vr: function () {
      console.log("点击了古庙VR")
      // wx.navigateTo({
      //     url: '/pages/main/culture/temple',
      // })
      wx.navigateTo({
          url: '../out/LianHeGuo?src=' + encodeURIComponent("http://xmutsrsc.com/PanoramaVR/home1/"),
        })
  },
  click_3d: function () {
    console.log("点击了三维模型")
    // wx.navigateTo({
    //     url: '/pages/main/culture/temple',
    // })
    wx.navigateTo({
        url: '../out/LianHeGuo?src=' + encodeURIComponent("http://xmutsrsc.com/3DPlatform/MZJZ.html"),
      })
  },
  click_QuanJing: function () {
      console.log("点击了湄洲全景")
      wx.navigateTo({
          url: '../out/QuanJing?src=' + encodeURIComponent("http://xmutsrsc.com/Panorama/index.html"),
        })
  },
  click_xmutsrsc: function () {
      console.log("点击了xmutsrsc")
      wx.navigateTo({
          url: '../out/xmutsrsc?src=' + encodeURIComponent("http://xmutsrsc.com:4000/mzmap/#/welcome"),
        })
  },
  click_LianHeGuo:function () {
      wx.navigateTo({
          url: '../out/LianHeGuo?src=' + encodeURIComponent("http://xmutsrsc.com:4000/mcrb/#/"),
        })
  },
  click_temple: function () {
    console.log("点击了祖庙活动")
    wx.navigateTo({
        url: '../out/QuanJing?src=' + encodeURIComponent("https://mp.weixin.qq.com/s/tiqng7R3pwKJt_53Z3kLPg"),
      })
  },
  click_story: function () {
    console.log("点击了妈祖生平")
    wx.navigateTo({
        url: '../out/QuanJing?src=' + encodeURIComponent("https://mp.weixin.qq.com/s/djajtOdFRI0dGLPzUWEdIw"),
      })
},
  
  click_xmutsrsc: function () {
      console.log("点击了xmutsrsc")
      wx.navigateTo({
          url: '../out/xmutsrsc?src=' + encodeURIComponent("http://xmutsrsc.com:4000/mzmap/#/welcome"),
        })
  }

})

  



