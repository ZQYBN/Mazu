// pages/postcard/ai_style/ai_style.js
var BlueMe_AIGC = require('../../../../utils/BlueMe-AIGC');
const app = require('../../../../utils/watch')

Page({
    /**
     * 页面的初始数据
     */
    data: {
        is_select: [0, 0, 0, 0],//样式选中状态，默认0
        img_src: '',//传进来的img_src
        is_shuban: true,
        imgsrc_ai: '',//传出去的imgsrc_ai
        imgsrc_ai_tmp: '',//传出去的imgsrc_ai的临时路径
        styles: ['超现实主义艺术,极高分辨率的细节，摄影，逼真感极致，纹理精细，栩栩如生	',
            '中国水墨山水画,古典山水艺术,吴冠中的山水画,大胆的泼墨,宁静,永恒',
            '描绘夏日、暖光、宫崎骏的风景意象、吉卜力风、晴空、大片云、充满趣味的插图、高纯度色彩、手绘感、震撼人心的画面，8k',
            '令人惊叹的风景艺术品，细胞明暗与水彩的融合，美丽的风景，极简主义，高视角，迷人，可爱，迷人，风格化，动漫艺术，Skottie Young，Paul Cezanne，流行艺术装饰，充满活力'],//ai预设样式提示词数组
        index: '0',//当前选中的ai样式提示词，默认第一个
        start: '',
        url: ''
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
        console.log(options)
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight,
            img_src: options.src,
            is_shuban: options.is_shuban
        })
        app.watch(this, {
            imgsrc_ai: function name(data) {
                setTimeout(() => {
                    var that = this;
                    wx.downloadFile({
                        url: that.data.imgsrc_ai,
                        success: function (res) {
                            if (res.statusCode === 200) {
                                var tempFilePath = res.tempFilePath;
                                // console.log('临时文件路径:', tempFilePath);
                                that.setData({
                                    imgsrc_ai_tmp: tempFilePath
                                })
                                // 关闭当前页面返回上一层页面
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
                                    })
                                }, 500)
                            } else {
                                wx.hideLoading();
                                console.log('文件下载失败');
                            }
                        },
                        fail: function () {
                            wx.hideLoading();
                            console.log('文件下载失败');
                        }
                    });
                }, 100)
            }
        });
        app.watch(this, {
            start: function name(data) {
                console.log(1)
                setTimeout(() => {
                    if (this.data.start == false && this.data.imgsrc_ai == '') {
                        console.log(2)
                        wx.hideLoading();
                        wx.showToast({
                            title: '处理失败',
                            icon: 'error',
                            duration: 1000
                        })
                    }
                }, 500)
            }
        });
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
        // 在其他页面中获取全局变量
        const app = getApp();
        if (this.data.imgsrc_ai_tmp != '') {
            // 修改全局变量的值
            app.globalData.imgsrc_ai = this.data.imgsrc_ai_tmp;
            app.globalData.is_return_from_ai = true;
            console.log(app.globalData.imgsrc_ai)
        }
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
    ai_style01: function () {
        this.setData({
            is_select: [1, 0, 0, 0],
            index: 0
        });

    },
    ai_style02: function () {
        this.setData({
            is_select: [0, 1, 0, 0],
            index: 1
        });
    },
    ai_style03: function () {
        this.setData({
            is_select: [0, 0, 1, 0],
            index: 2
        });
    },
    ai_style04: function () {
        this.setData({
            is_select: [0, 0, 0, 1],
            index: 3
        });
    },
    back: function () {
        var YuShe = this.data.styles[this.data.index];//预设提示词
        console.log(YuShe)
        if (this.data.is_shuban == "true") {
            BlueMe_AIGC.BlueMe_AIGC(this, YuShe, '', '55c682d5eeca50d4806fd1cba3628781', 'imgsrc_ai',
                "800", "600", '-1', 0, 'start', '', '', this.data.img_src)
            wx.showLoading({ title: '图片处理中', mask: true })
        }
        if (this.data.is_shuban == "false") {
            BlueMe_AIGC.BlueMe_AIGC(this, YuShe, '', '55c682d5eeca50d4806fd1cba3628781', 'imgsrc_ai',
                "600", "800", '-1', 0, 'start', '', '', this.data.img_src)
            wx.showLoading({ title: '图片处理中', mask: true })
        }

    },
})