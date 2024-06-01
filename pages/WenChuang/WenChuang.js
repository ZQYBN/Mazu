// pages/WenChuang/WenChuang.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      value: '',
    },
    onChange(e) {
      this.setData({
        value: e.detail,
      });
    },
    onSearch() {
      Toast('搜索' + this.data.value);
    },
    onClick() {
      Toast('搜索' + this.data.value);
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
        // 屏幕高度
        const screenHeight = systemInfo.windowHeight;
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight,
            scroll_height:screenHeight-statusBarHeight-titleHeight
        });
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
        this.getTabBar().setData({
            // 根据list 的索引
            active: "WenChuang"
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
})