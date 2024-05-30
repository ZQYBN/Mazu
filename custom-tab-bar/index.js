// custom-tab-bar/index.js
// Page({
//     /**
//      * 页面的初始数据
//      */
//     data: {
//         active: 'Home',
//     },
//     onChange(event) {
//         // event.detail 的值为当前选中项的索引
//         // this.setData({ active: event.detail });
//         var name = event.detail;
//         switch (name) {
//             case "Home":
//                 wx.switchTab({
//                     url: '/pages/home/home'
//                 })
//                 break;
//             case "AI":
//                 wx.switchTab({
//                     url: '/pages/AI/AI'
//                 })
//                 break;
//             case "Map":
//                 wx.navigateTo({
//                     url: '/pages/map/map',
//                 })
//                 break;
//             case "temple":
//                 wx.switchTab({
//                     url: '/pages/temple/temple'
//                 })
//                 break;
//             case "My":
//                 console.log(666)
//                 wx.switchTab({
//                     url: '/pages/My/my'
//                 })
//                 break;
//         }
//     },
//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad(options) {

//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady() {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow() {
//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide() {
//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload() {
//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh() {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom() {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage() {
//     }
// })

// custom-tab-bar/index.js
Component({
    data: {
        active: 'Home',
    },
    methods: {
        onChange(event) { // 切换tab页面
            var name = event.detail;
            switch (name) {
                case "Home":
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                    break;
                case "AI":
                    wx.switchTab({
                        url: '/pages/AI/AI'
                    })
                    break;
                case "Map":
                    wx.navigateTo({
                        url: '/map/pages/map/map',
                    })
                    break;
                case "temple":
                    wx.switchTab({
                        url: '/pages/temple/temple'
                    })
                    break;
                case "My":
                    wx.switchTab({
                        url: '/pages/My/my'
                    })
                    break;
                case "WenChuang":
                    wx.switchTab({
                        url: '/pages/WenChuang/WenChuang'
                    })
                    break;
            }
        }
    },
});





