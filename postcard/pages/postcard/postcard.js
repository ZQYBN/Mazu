// pages/postcard/postcard.js
// 在其他页面中获取全局变量
const app = getApp();
// 竖版数据
var ShuBan_parameters = {};
// 横版数据
var HengBan_parameters = {};

Page({
    /**
     * 页面的初始数据
     */
    data: {
        images_01: [
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%B9%84%E5%B7%9E%EF%BC%88%E7%AB%96%E7%89%88%E4%BA%BA%E6%96%87%EF%BC%89.png?sign=a4cc1366f4220f4022f0b62a885d88fc&t=1715426103',//竖版图片数据
                src1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/Mei%20Zhou1.png?sign=b2e5e1729343120736181528eb79c1ed&t=1715590550',//横版图片数据
                is_select: false
            },
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/F73BCD2684DEACB328DE037E61C8A210.png?sign=f860006ae477c9c9481d9a56f6f0be3b&t=1715425875',
                src1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E5%B2%9B%E4%B8%8A%E5%A6%88%E7%A5%96%E5%BA%87%E4%B8%80%E6%96%B9%EF%BC%8C%20%E9%A6%99%E7%81%AB%E7%BC%AD%E7%BB%95%E7%A5%88%E5%B9%B3%E5%AE%89.png?sign=8df05cee51ff0e7367daec7025a5fc01&t=1715590615',
                is_select: false
            },
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E8%AF%BE%E6%9C%AC%E6%A8%A1%E6%9D%BF.png?sign=661ee76e45df8870dbf11a522192f11e&t=1715425500',
                src1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%B0%B4%E5%A2%A8%EF%BC%88%E6%A8%AA%E6%9D%BF%E8%87%AA%E7%84%B6%EF%BC%89.png?sign=1cd6d51ae5bace207e10a74eb5f114d4&t=1715590644',
                is_select: false
            },
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E4%B8%87%E8%83%BD%E6%A8%A1%E6%9D%BF.png?sign=00695bb30debce50af15a758864b0c8d&t=1715425467',
                src1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%B0%B4%E5%BD%A9.png?sign=98ebf4063faf30be776c903c37705968&t=1715593524',
                is_select: false
            },
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%B9%84%E6%B4%B2%EF%BC%88%E7%AB%96%E7%89%88%EF%BC%89.png?sign=e08f971997ef04aa1cfb684ee3c39bef&t=1715590701',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E5%AF%B9%E8%81%94.png?sign=cbdb77ca3a5f74678fcf1bfbf67e9191&t=1715593492',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            }
        ],
        images_02: [
            {
                src: 'https://img.qovv.cn/2024/05/10/663e26e83d8b9.png',//竖版图片数据
                src1: 'https://img.qovv.cn/2024/05/11/663f2442d3fa2.png',//横版图片数据
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/11/663ec92a30260.png',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/11/663f25d6909b2.png',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/11/663f25bdd8f46.png',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/09/663cd3c958782.png',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/02/663314622e32b.jpg',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.qovv.cn/2024/05/09/663cd31bbeff0.png',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            },
            {
                src: 'https://img.yzcdn.cn/vant/cat.jpeg',
                src1: 'https://img.qovv.cn/2024/05/11/663f24c563a27.png',
                is_select: false
            }
        ],
        images_03: [
            { src: 'https://img.yzcdn.cn/vant/cat.jpeg', is_select: false },
            { src: '/img/壁纸2.png', is_select: false },
            { src: '/img/壁纸2.png', is_select: false },
            { src: '/img/壁纸2.png', is_select: false },
            { src: '/img/壁纸2.png', is_select: false }
        ],
        is_shu: true,//判断横竖版，用于列表渲染
        isUploaderShown: true,// 默认需要显示text
        current_template: "", // 当前模版src
        reset_index: 0,//需要重置的数据索引，默认0
        is_shuban: true,
        // 底图裁剪
        src: '',//底图地址
        imgcut_src: '',//裁剪后底图地址
        template_width: 0,//模板画布宽,单位px
        template_height: 0, //模板画布高,单位px

        cut_img_height: 35,//裁剪框距离标题距离，单位px
        // 以下参数不用调，自动计算
        width: 0,//宽度
        height: 0,//高度
        img_width: 120, //底部模板图片宽,单位rpx
        img_height: 160,//底部模板图片高,单位rpx
        canvas_top_height: 0,//画布顶边距，单位px
        container_height: 0,//画布顶边距，单位px
        container_left: 0,//整个裁剪框容器的顶边距
        bottom_height: 0,//底部功能区高度
        scroll_content: 200,//滚动栏视图高度
        // ------------------------------------------
        bnt_color1: "#ffffff",//竖版背景颜色
        icon_color1: "#000000",//竖版图标颜色
        bnt_color2: "#000000",//横版背景颜色
        icon_color2: "#ffffff",//横版图标颜色
        //画布
        canvasWidth: 0,               // 画布宽
        canvasHeight: 0,              // 画布高
        canvasDom: null,              // 画布dom对象
        canvas: null,                  // 画布的节点
        ctx: null,                    // 画布的上下文
        dpr: 1,                       // 设备的像素比
        clockPoint: ''//打卡点
    },
    /**
    * 生命周期函数--监听页面加载
    */
    onLoad(options) {
        console.log("触发onLoad")
        const systemInfo = wx.getSystemInfoSync();
        // 屏幕高度
        const screenHeight = systemInfo.windowHeight;
        // 屏幕宽度
        const screenWidth = systemInfo.windowWidth;
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight
        // 标题栏高度
        let titleHeight = 46
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight,
            width: screenWidth * 0.65,//画布宽度
            height: screenWidth * 0.65 * 4 / 3//画布高度
        });
        this.setData({
            container_height: statusBarHeight + titleHeight + this.data.cut_img_height,
            container_left: (screenWidth - this.data.width) / 2,
            bottom_height: screenHeight - statusBarHeight - titleHeight - this.data.height - 2 * this.data.cut_img_height,
            canvas_top_height: statusBarHeight + titleHeight + 2,
            template_height: this.data.cut_img_height * 2 + this.data.height - 6, //模板画布高,单位px
            template_width: this.data.cut_img_height * 1.5 + this.data.height * 0.75,//模板画布宽,单位px
        });
        this.ShuBan_parameters();
        this.HengBan_parameters();
        //获取到image-cropper实例
        this.cropper = this.selectComponent("#image-cropper");
        this.init_canvas();
    }
    ,
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.log("触发 onShow() ")
        // console.log(app.globalData.clockPoint)
        this.setData({
            clockPoint: app.globalData.clockPoint
        })
        if (app.globalData.imgsrc_ai != '') {
            // console.log("app.globalData.imgsrc_ai:" + app.globalData.imgsrc_ai)
            this.setData({
                src: app.globalData.imgsrc_ai,
            });
            app.globalData.imgsrc_ai = '';
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
    back_page: function () {
        wx.navigateBack({
            delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
        })
    },
    uploadImg: function () {
        console.log("上传图片")
        var that = this;
        wx.chooseMedia({
            count: 1,
            sizeType: ['original','compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                const tempFilePaths = res.tempFiles[0].tempFilePath;
                wx.showLoading({
                    title: '加载中...'
                })
                that.setData({
                    src: tempFilePaths,
                    isUploaderShown: false,
                })
            }
        })
    },
    change_photo: function () {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
        } else {
            this.uploadImg(); //上传图片
        }
    },
    ai_style: function () {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
        } else {
            var url = '/postcard/pages/postcard/ai_style/ai_style'
            //要传输的数据
            var data = '?' + 'src=' + this.data.src + '&' + 'is_shuban=' + this.data.is_shuban
            wx.navigateTo({
                url: url + data
            })
        }
    },
    rotate_photo: function () {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
        } else {
            //在用户旋转的基础上旋转90°
            this.cropper.setAngle(this.cropper.data.angle += 90);
        }
    },
    // 判断选中的哪个模版
    toggleSelect01: function (event) {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        const index = event.currentTarget.dataset.index;
        const selectedImage = this.data.images_01[index];
        const currentSrc = this.data.is_shu ? selectedImage.src : selectedImage.src1;
        this.data.images_01.forEach((item, idx) => {
            item.is_select = idx === index;
        });
        this.setData({
            images_01: this.data.images_01,
            current_template: currentSrc, // 使用currentSrc作为当前选中的模板
            reset_index: 0
        });
        console.log("当前选中的模版:" + currentSrc);
        draw(this.data.current_template);
    },
    // 大牌坊模版
    toggleSelect02: function (event) {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        if (this.data.clockPoint[0].is_check != true) {
            console.log(this.data.clockPoint[0].is_check)
            wx.showToast({
                title: '大牌坊未打卡',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        const index = event.currentTarget.dataset.index;
        const selectedImage = this.data.images_02[index];
        const currentSrc = this.data.is_shu ? selectedImage.src : selectedImage.src1;
        this.data.images_02.forEach((item, idx) => {
            item.is_select = idx === index;
        });
        this.setData({
            images_02: this.data.images_02,
            current_template: currentSrc, // 使用currentSrc作为当前选中的模板
            reset_index: 1
        });
        draw(this.data.current_template);
    },
    // 天后宫模版
    toggleSelect03: function (event) {
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        if (this.data.clockPoint[1].is_check != true) {
            console.log(this.data.clockPoint[1].is_check)
            wx.showToast({
                title: '天后宫未打卡',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        const index = event.currentTarget.dataset.index;
        const selectedImage = this.data.images_03[index];
        const currentSrc = this.data.is_shu ? selectedImage.src : selectedImage.src1;
        this.data.images_03.forEach((item, idx) => {
            item.is_select = idx === index;
        });
        this.setData({
            images_03: this.data.images_03,
            current_template: currentSrc, // 使用currentSrc作为当前选中的模板
            reset_index: 2
        });
        draw(this.data.current_template);
    },
    cropperload(e) {
        console.log("cropper初始化完成");
    },
    loadimage(e) {
        wx.hideLoading();
        console.log("图片加载完成", e.detail);
        var img_width = e.detail.width;
        var img_height = e.detail.height;
        if (img_width >= img_height) {
            //宽大于高 横版
            this.template_02();
        } else {
            //宽小于高 竖版
            this.template_01();
        }
    },
    clickcut(e) {
        console.log(e.detail);
        // //点击裁剪框阅览图片
        // wx.previewImage({
        //     current: e.detail.url, // 当前显示图片的http链接
        //     urls: [e.detail.url] // 需要预览的图片http链接列表
        // })
    },
    next: function () {
        console.log("点击了下一步")
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
        } else {
            wx.showLoading({
                title: '上传图片中...',
            })
            // 获取裁剪后图片
            this.cropper.getImg((obj) => {
                console.log("裁剪后的图片URL:" + obj.url)
                this.setData({
                    imgcut_src: obj.url
                });
                // 合成图片,先清空画布
                this.data.ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight)
                //创建图片对象
                const bg = this.data.canvas.createImage()
                //底图地址
                bg.src = this.data.imgcut_src
                bg.onload = () => { //图片加载完毕
                    //绘制底图
                    if (this.data.is_shuban == true) {
                        console.log("这是竖版")
                        this.data.ctx.drawImage(bg,(this.data.template_width-this.data.width)/2*this.data.dpr, this.data.cut_img_height*this.data.dpr, this.data.width*this.data.dpr, this.data.height*this.data.dpr) //绘制图片
                    }else{
                        console.log("这是横版")
                        this.data.ctx.drawImage(bg,(this.data.template_width-this.data.width)/2*this.data.dpr,35*this.data.dpr, this.data.width*this.data.dpr, this.data.height*this.data.dpr) //绘制图片
                    }
                }
                setTimeout(() => {
                    //创建图片对象
                    const bg1 = this.data.canvas.createImage()
                    //模版地址
                    bg1.src = this.data.current_template
                    bg1.onload = () => { //图片加载完毕
                        //第一个参数是图片对象 其他参数与清空画布类似
                        this.data.ctx.drawImage(bg1, 0, 0, this.data.canvasWidth, this.data.canvasHeight) //绘制图片
                    };
                    setTimeout(() => {
                        //新版的保存
                        wx.canvasToTempFilePath({
                            // 把画布转化成临时文件
                            x: 0,
                            y: 0,
                            width: this.width,  // 截取的画布的宽
                            height: this.height,  // 截取的画布的高
                            destWidth: 5 * this.width,  // 保存成的画布宽度
                            destHeight: 5 * this.height,  // 保存成的画布高度
                            fileType: 'png',  // 保存成的文件类型
                            quality: 1,  // 图片质量
                            canvas: this.data.canvas,
                            success(res) {
                                console.log(res.tempFilePath)
                                wx.hideLoading()
                                var url = '/postcard/pages/postcard/postcard_result/postcard_result'
                                //要传输的数据
                                var data = '?' + 'imgcut_src=' + res.tempFilePath
                                wx.navigateTo({
                                    url: url + data
                                })
                            },
                            fail(error) {
                                console.log(error);
                                wx.showToast({
                                    title: '图片保存失败，稍后再试',
                                    duration: 2000,
                                    icon: 'none'
                                });
                            }
                        });
                    }, 1000)
                }, 100)
            });
        }
    },
    // 切换模版
    change_tamplate: function (width, height) {
        if (app.globalData.is_return_from_ai == true) {
            console.log("标记：" + app.globalData.is_return_from_ai)
            app.globalData.is_return_from_ai = false;
        } else {
            console.log("模版清空了")
            draw('');
            this.setData({
                current_template: ''
            })
        }
        this.resetSelect();//重置选中项

        if (width <= height) {
            // 宽度小于等于高度，竖版
            this.setData({
                cut_img_height: ShuBan_parameters.cut_img_height,
                width: ShuBan_parameters.width,
                height: ShuBan_parameters.height,
                template_width: ShuBan_parameters.template_width,
                template_height: ShuBan_parameters.template_height,
                img_width: ShuBan_parameters.img_width,
                img_height: ShuBan_parameters.img_height,
                canvas_top_height: ShuBan_parameters.canvas_top_height,
                container_height: ShuBan_parameters.container_height,
                bottom_height: ShuBan_parameters.bottom_height,
                container_left: ShuBan_parameters.container_left,
                scroll_content: ShuBan_parameters.scroll_content//模版图形视图高度
            })
        } else {
            // 宽度大于高度，横版
            this.setData({
                width: HengBan_parameters.width,
                height: HengBan_parameters.height,
                cut_img_height: HengBan_parameters.cut_img_height,
                template_width: HengBan_parameters.template_width,
                template_height: HengBan_parameters.template_height,
                img_width: HengBan_parameters.img_width,
                img_height: HengBan_parameters.img_height,
                container_left: HengBan_parameters.container_left,
                canvas_top_height: HengBan_parameters.canvas_top_height,
                container_height: HengBan_parameters.container_height,
                bottom_height: HengBan_parameters.bottom_height,
                scroll_content: HengBan_parameters.scroll_content//模版图形视图高度
            })
        }
        this.cropper.setTransform({
            scale: -1
        });
        this.init_canvas();
    },
    template_01: function () {
        console.log("切换竖版")
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        this.setData({
            bnt_color1: "#ffffff",
            icon_color1: "#000000",
            bnt_color2: "#000000",
            icon_color2: "#ffffff",
            is_shu: true,
            is_shuban: true
        })
        this.change_tamplate(0, 1);
    },
    template_02: function () {
        console.log("切换横版")
        if (this.data.src == '') {
            wx.showToast({
                title: '请先上传图片',
                icon: 'error',
                duration: 1000
            })
            return;
        }
        this.setData({
            bnt_color2: "#ffffff",
            icon_color2: "#000000",
            bnt_color1: "#000000",
            icon_color1: "#ffffff",
            is_shu: false,
            is_shuban: false
        })
        this.change_tamplate(1, 0);
    },
    // 初始化画布
    init_canvas: function () {
        // 初始化结果画布
        const query = wx.createSelectorQuery()  // 创建一个dom元素节点查询器
        query.select('#result')              // 选择我们的canvas节点
            .fields({                             // 需要获取的节点相关信息
                node: true,                         // 是否返回节点对应的 Node 实例
                size: true                          // 是否返回节点尺寸（width height）
            }).exec((res) => {                    // 执行针对这个节点的所有请求，exec((res) => {alpiny})  这里是一个回调函数
                const dom = res[0]                            // 因为页面只存在一个画布，所以我们要的dom数据就是 res数组的第一个元素
                const canvas = dom.node                       // canvas就是我们要操作的画布节点
                const ctx = canvas.getContext('2d')           // 以2d模式，获取一个画布节点的上下文对象
                const dpr = wx.getSystemInfoSync().pixelRatio // 获取设备的像素比，未来整体画布根据像素比扩大
                // Canvas 画布的实际绘制宽高
                const width = res[0].width
                const height = res[0].height
                canvas.width = width * dpr
                canvas.height = height * dpr
                this.setData({
                    canvasDom: dom,   // 把canvas的dom对象放到全局
                    canvas: canvas,   // 把canvas的节点放到全局
                    ctx: ctx,         // 把canvas 2d的上下文放到全局
                    dpr: dpr,         // 屏幕像素比
                    canvasWidth: canvas.width,
                    canvasHeight: canvas.height
                })
            })
    },
    // 编写方法来重置is_select值为false
    resetSelect: function () {
        const resetdata = [this.data.images_01, this.data.images_02, this.data.images_03]
        const imagesData = resetdata[this.data.reset_index]; // 假设需要处理reset_data数据数组
        const selectedIndex = imagesData.findIndex((item) => item.is_select === true); // 找到is_select为true的元素的索引
        if (selectedIndex !== -1) {
            imagesData[selectedIndex].is_select = false; // 将is_select为true的元素的值置为false
            if (this.data.reset_index == 0) {
                this.setData({
                    images_01: imagesData,
                });
            }
            if (this.data.reset_index == 1) {
                this.setData({
                    images_02: imagesData,
                });
            }
            if (this.data.reset_index == 2) {
                this.setData({
                    images_03: imagesData,
                });
            }

        }
    },
    ShuBan_parameters: function () {
        const systemInfo = wx.getSystemInfoSync();
        // 屏幕高度
        const screenHeight = systemInfo.windowHeight;
        // 屏幕宽度
        const screenWidth = systemInfo.windowWidth;
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight;
        // 标题栏高度
        let titleHeight = 46;
        // 宽度小于高度，竖版
        var cut_img_height = 35;//裁剪框距离标题距离，单位px
        var width = screenWidth * 0.65;// 底图宽
        var height = screenWidth * 0.65 * 4 / 3;// 底图高
        // 以下参数不用调，自动计算
        var template_width = cut_img_height * 1.5 + height * 0.75; //模板画布宽,单位px
        var template_height = cut_img_height * 2 + height - 6; //模板画布高,单位px
        var img_width = 120; //底部模板图片宽,单位rpx
        var img_height = 160; //底部模板图片高,单位rpx
        var canvas_top_height = statusBarHeight + titleHeight + 2;//画布顶边距，单位px
        var container_height = statusBarHeight + titleHeight + cut_img_height;//整个裁剪框容器的顶边距
        var bottom_height = screenHeight - statusBarHeight - titleHeight - height - 2 * cut_img_height;
        ShuBan_parameters = {
            cut_img_height: cut_img_height,
            width: width,
            height: height,
            template_width: template_width,
            template_height: template_height,
            img_width: img_width,
            img_height: img_height,
            canvas_top_height: canvas_top_height,
            container_height: container_height,
            bottom_height: bottom_height,
            container_left: (screenWidth - width) / 2,
            scroll_content: 200//模版图形视图高度
        };
        // console.log(ShuBan_parameters)
    },
    HengBan_parameters: function () {
        const systemInfo = wx.getSystemInfoSync();
        // 屏幕高度
        const screenHeight = systemInfo.windowHeight;
        // 屏幕宽度
        const screenWidth = systemInfo.windowWidth;
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight;
        // 标题栏高度
        let titleHeight = 46;
        // 宽度大于高度，横版
        var cut_img_height = 70;//裁剪框距离标题距离，单位px
        var width = screenWidth * 0.7//底图宽度
        var height = screenWidth * 0.7 * 3 / 4//底图高度
        var template_height = 35 * 2 + height - 6; //模板画布高,单位px
        var template_width = 35 * 8 / 3 + height * 4 / 3; //模板画布宽,单位px
        var img_width = 213.33; //底部模板图片宽,单位rpx
        var img_height = 160; //底部模板图片高,单位rpx
        var canvas_top_height = statusBarHeight + titleHeight + cut_img_height / 2;//画布顶边距，单位px
        var container_height = statusBarHeight + titleHeight + cut_img_height;//整个裁剪框容器的顶边距
        var bottom_height = screenHeight - statusBarHeight - titleHeight - height - 2 * cut_img_height;
        HengBan_parameters = {
            width: width,
            height: height,
            cut_img_height: cut_img_height,
            template_width: template_width,
            template_height: template_height,
            img_width: img_width,
            img_height: img_height,
            container_left: (screenWidth - width) / 2,
            canvas_top_height: canvas_top_height,
            container_height: container_height,
            bottom_height: bottom_height,
            scroll_content: 200//模版图形视图高度
        }
        // console.log(HengBan_parameters)
    }
})

function draw(url) {
    // 绘制模版
    wx.createSelectorQuery()
        .select('#myCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
            // Canvas 对象
            const canvas = res[0].node
            // 渲染上下文
            const ctx = canvas.getContext('2d')
            // Canvas 画布的实际绘制宽高
            const width = res[0].width
            const height = res[0].height
            // 初始化画布大小
            const dpr = wx.getWindowInfo().pixelRatio//获取屏幕比例,用来解决渲染画布模糊的问题
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
            // 用来解决画布里面东西能够自适应,不同屏幕不同尺寸 375不行的话用750
            const ratio = wx.getSystemInfoSync()?.windowWidth / 375;
            ctx.clearRect(0, 0, width, height)
            //可以是获取用户 可以走接口 图片地址用Https!!!!
            //创建图片对象
            const bg = canvas.createImage()
            //底图地址
            bg.src = url
            bg.onload = () => { //图片加载完毕
                //第一个参数是图片对象 其他参数与清空画布类似
                ctx.drawImage(bg, 0, 0, width, height) //绘制图片
            }
        })
}

