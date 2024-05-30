// pages/main/culture/mazu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    // 状态栏高度 
    let statusBarHeight = systemInfo.statusBarHeight
    // 标题栏高度
    let titleHeight = 46
    this.setData({
        statusBarHeight: statusBarHeight,
        titleHeight: titleHeight
    })
  },
  back_page: function () {
    wx.navigateBack({
        delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
    })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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

  }
})