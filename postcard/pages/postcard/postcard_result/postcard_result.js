// pages/postcard/postcard_result/postcard_result.js
//设置全局变量
var image_top 
var imahe_left 
var image_width 
var image_height 
var canvas_width;
//初始化画布的宽度
var canvas_height;
var textCanvas
var textCtx;
var zoom;
var jnz1_x;
var jnz1_y;
var jnz1_width;
var jnz2_y;
var image_id1;
var image_id2;
var i = 1
var text_x;
var text_y;
var text_maxwidth
var text_line;
var text_xhx_hd;
var text_sm_x;
var text_sm_y;
var text_sm_width;
var data_jy;
var BlueLM_70B = require('../../../../utils/BlueLM-70B')
var app = require('../../../../utils/watch')
var rx = '根据用户输入内容进行美化，生成符合明信片的内容，要求内容简短、优美，生成字数不能超过20个字，以下是模版：1.无论早晚，自由的灵魂都应该与世界相遇，感受生命的美好。2.愿我们都奔走在热爱里，光芒万丈。3.世间万物，唯美食和美景不可辜负。'
var dpr
var xbimage_x;
var xbimage_y;
var xbimage_width;
var xbimage_height;
var ms = '';
var text_sm;
var time_text;
var time_x;
var time_y;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current_template: "", // 当前模版src
        imgcut_src: '',//裁剪后底图地址
        text: '',
        start: '',
    },
    back_page: function () {
        wx.navigateBack({
            delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        image_id1 = null;
        image_id2 = null;
        i = 1
        var late = this;
        const systemInfo = wx.getSystemInfoSync();
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight
        // 标题栏高度
        let titleHeight = 46;
        // 屏幕高度
        const screenHeight = systemInfo.windowHeight;
        //屏宽度
        let screenWidth = systemInfo.screenWidth;
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight,
            imgcut_src: options.imgcut_src,//底图src
        })
        setTimeout(()=>{
            this.setData({
                scroll_height:screenHeight-titleHeight-statusBarHeight-canvas_height
            })
        },1000),
        //获取图片的比例信息，以便后续设置4:3和3:4的明信片的
        wx.getImageInfo({
            src: options.imgcut_src,
            success: function (cg) {
                //画布宽度=屏幕的宽度的90%
                canvas_width = screenWidth * 0.9
                var proportion = cg.height / cg.width
                if (proportion <= 0.75) {
                    canvas_height = canvas_width / 4 * 3
                    ms = '横屏'
                }
                else {
                    canvas_height = canvas_width / 3 * 4
                    ms = '竖屏'
                }
                late.setData({
                    ms: ms,
                    canvas_width: canvas_width,
                    canvas_height: canvas_height,
                })
                setTimeout(() => {
                    canvas(canvas_width, ms, options.imgcut_src)
                }, 0)
            },
            fail: function (sb) {
                console.log('第一步的加载图片失败', sb)
            }
        })
        //动态监听
        app.watch(this, {
            start: function name(params) {
                setTimeout(() => {
                    console.log(this.data.start)
                    if (this.data.start == false) {
                        //隐藏加载界面
                        wx.hideLoading();
                    }
                }, 0)
            }
        })
    },
    //监听寄语
    jtjp: function (e) {
        //输入框的值
        data_jy = e.detail.value
        console.log(data_jy)
        console.log('键盘输入中', e)
        text_jy(data_jy)
    },
    //监听署名
    smjp: function (e) {
        console.log(e)
        text_sm = e.detail
        text_smtj(text_sm)
    },
    AIrs: function () {
        if (data_jy != null && data_jy != '') {
            console.log('点击')
            //显示加载
            wx.showLoading({
                title: '加载中',
                mask: true
            })

            BlueLM_70B.BlueMe_70B(this, 'text', '帮我美化下面的语句:' + data_jy, 0, 'start', rx, '', '',20).then(cg => {
                console.log(cg[1])
                data_jy = cg[1]
                text_jy(cg[1])
                this.setData({
                    value1: cg[1],
                  })
            })
        }
    },
    baocun: function () {
        console.log('1')
        this.canvas_image_bc().then(cg => {
          wx.showShareImageMenu({  //分享给朋友
            path: cg,
            success: (res) => {
                console.log("分享成功：", res);
            },
            fail: (err) => {
                console.log("分享失败：", err);
              }
            })
        }).catch(sg => {
        })
    },
    image: function (e) {
        //记录添加的图片
        if (i == 3 || i == 4) {
            if (image_id1 == e.currentTarget.dataset.id) {
                image_id1 = null
                i++
                canvas_qc(jnz1_y)
            } else if (image_id2 == e.currentTarget.dataset.id) {
                image_id2 = null
                i++
                canvas_qc(jnz2_y)
            }
            if (i == 5) {
                i = 1;
            }
            return;
        }
        else if (image_id1 == null) {
            image_id1 = e.currentTarget.dataset.id
        } else if (image_id1 != null && image_id2 == null) {
            image_id2 = e.currentTarget.dataset.id
        }
        console.log(e)
        switch (e.currentTarget.dataset.id) {
            case '1': {
                console.log('点击了第一张图片')
                console.log(i)
                canvas_image(i, e.currentTarget.dataset.url)
                break
            }
            case '2': {
                console.log('点击了第二张图片')
                canvas_image(i, e.currentTarget.dataset.url)
                break
            }
            case '3': {
                console.log('点击了第三张图片')
                canvas_image(i, e.currentTarget.dataset.url)
                break
            }
            case '4': {
                console.log('点击了第四张图片')
                canvas_image(i, e.currentTarget.dataset.url)
                break
            }
            case'5':{
              console.log('点击了第五张图片')
              canvas_image(i, e.currentTarget.dataset.url)
              break
            }
        }
        i++
    },
    //将图片保存到临时路径
    canvas_image_bc: function name(params) {
        return new Promise((cg, sb) => {
          //重新绘制图片的底部
          //删除底部
          textCtx.clearRect(xbimage_x,xbimage_y,xbimage_width,xbimage_height);
          //添加底部图片
          var dbimage = textCanvas.createImage();
            if(ms=='竖屏'){
              dbimage.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E7%AB%96%E7%89%88%E6%98%8E%E4%BF%A1%E7%89%87%E7%9A%84%E4%B8%8B%E5%8D%8A%E9%83%A8%E5%88%86.png?sign=29347e736a39170de7a55094ed5956f3&t=1715608455'
            }else if(ms=='横屏'){
              dbimage.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%A8%AA%E7%89%88%E6%98%8E%E4%BF%A1%E7%89%87%E4%B8%8B%E9%9D%A2%E9%83%A8%E5%88%86.png?sign=6bb9a50c8aadd22ce66b35f072ea699b&t=1715608462'
            }
            dbimage.onload = (e) =>{
              textCtx.drawImage(dbimage,xbimage_x,xbimage_y,xbimage_width,xbimage_height)
              //重新添加文本
              //添加寄语
              text_jy(data_jy,true).then(data=>{
                //添加署名
                text_smtj(text_sm,true)
                //添加日期
                var text_size = 15 * zoom
                textCtx.font = text_size + 'px' + " sans-serif";
                textCtx.fillStyle = "#000000";
                textCtx.fillText(time_text, time_x,time_y)
                setTimeout(()=>{
                  wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: this.data.canvac_width,
                    height: this.data.canvac_height,
                    destWidth: this.data.canvac_width * dpr, // 输出图片的宽度
                    destHeight: this.data.canvac_height * dpr, // 输出图片的高度
                    canvas: textCanvas, // 传入canvas实例
                    fileType: 'png',
                    success(res) {
                        cg(res.tempFilePath)
                        console.log('图片保存成功', res.tempFilePath);
                    },
                    fail(res) {
                        console.log('导出图片失败', res);
                    }
                  });
              },0)
            })
          }
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
//添加画布
function canvas(width, ms, url) {
    //以苹果15pro为基础
    zoom = width / 387
    //查询画布
    wx.createSelectorQuery().select('#myCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
            //得到画布信息
            textCanvas = res[0].node;
            //使用2d渲染上下文
            textCtx = textCanvas.getContext('2d');
            const width = res[0].width
            const height = res[0].height
            console.log('宽度', width)
            console.log('高度', height)
            dpr = wx.getWindowInfo().pixelRatio
            textCanvas.width = width * dpr
            textCanvas.height = height * dpr
            textCtx.scale(dpr, dpr)
            textCtx.clearRect(0, 0, width, height)
            textCtx.beginPath();
            //添加背景
            if (ms == '竖屏') {
                console.log('竖屏')
                //添加背景
                var bj = textCanvas.createImage();
                bj.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E7%AB%96%E7%89%88%E6%98%8E%E4%BF%A1%E7%89%87.png?sign=e68ff812bf7b154db7ab5cf9a1bf125c&t=1715519912';
                bj.onload = (e) => {
                    textCtx.drawImage(bj, 0, 0, width, height)
                    console.log('1添加背景成功')
                    //添加合成的图片
                    image_top = 12.9 * zoom
                    imahe_left = 14.706 * zoom
                    image_width = 241.488 * zoom
                    image_height = 321.9848 * zoom
                    var hctp_image = textCanvas.createImage();
                    hctp_image.src = url
                    hctp_image.onload = (e) => {
                        textCtx.drawImage(hctp_image, imahe_left, image_top, image_width, image_height)
                        console.log('2添加合成图片成功')
                    },
                    hctp_image.onerror = (e) => {
                      console.log('2添加合成图片失败', e)
                    }
                    //添加纪念章框
                    jnz1_x = 279.414 * zoom
                    jnz1_y = 51.6 * zoom
                    jnz1_width = 98.88 * zoom
                    jnz2_y = jnz1_y + jnz1_width + 36.636 * zoom
                    textCtx.fillStyle = 'rgb(243, 225, 192)';
                    textCtx.fillRect(jnz1_x + 1, jnz1_y + 1, jnz1_width - 5, jnz1_width - 5)
                    textCtx.fillRect(jnz1_x + 1, jnz2_y + 1, jnz1_width - 5, jnz1_width - 5)
                    //计算文本的位置信息
                    text_x = imahe_left
                    text_y = 378.873 * zoom
                    text_maxwidth = 236.844*zoom
                    text_line = 28.889 * zoom
                    text_xhx_hd = 3.354 * zoom
                    text_sm_x = 290.895 * zoom
                    text_sm_y = 475.623 * zoom
                    text_sm_width = 78.045 * zoom
                    //计算底部删除像素信息，用在保存图片是去除莫名奇妙的阴影以及横线被覆盖的问题
                    xbimage_x = 0
                    xbimage_y = 335.4*zoom
                    xbimage_width = width
                    xbimage_height = 180.6*zoom
                    //添加时间
                    time_text = getCurTime()
                    var text_size = 15 * zoom
                    textCtx.font = text_size + 'px' + " sans-serif";
                    textCtx.textAlign = "left"
                    time_x = text_sm_x
                    time_y = text_sm_y+text_xhx_hd+text_size
                    textCtx.fillStyle = "#000000";
                    textCtx.fillText(time_text, time_x,time_y)
                },
                bj.onerror = (e) => {
                  console('1添加背景失败', e)
                };
            } else {
                //横屏
                console.log('横屏')
                //添加背景
                var bj = textCanvas.createImage();
                bj.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%98%8E%E4%BF%A1%E7%89%87%E8%A6%81%E7%B4%A0/%E6%A8%AA%E7%89%88%E6%98%8E%E4%BF%A1%E7%89%87.png?sign=e1a4426031353093488087f20a84b6e8&t=1715522855';
                bj.onload = (e) => {
                    textCtx.drawImage(bj, 0, 0, width, height)
                    console.log('1添加背景成功')
                    //添加合成的图片
                    image_top = 15.48 * zoom
                    imahe_left = 16.4475 * zoom
                    image_width = 222.525 * zoom
                    image_height = 166.89375 * zoom
                    var hctp_image = textCanvas.createImage();
                    hctp_image.src = url
                    hctp_image.onload = (e) => {
                        textCtx.drawImage(hctp_image, imahe_left,image_top , image_width, image_height)
                        console.log('2添加合成图片成功')
                    },
                    hctp_image.onerror = (e) => {
                      console.log('2添加合成图片失败', e)
                    }
                    //添加纪念章框
                    jnz1_x = 282.745 * zoom
                    jnz1_y = 15.48 * zoom
                    jnz1_width = 74.4975 * zoom
                    jnz2_y = jnz1_y + jnz1_width + 8.901 * zoom
                    textCtx.fillStyle = 'rgb(243, 225, 192)';
                    textCtx.fillRect(jnz1_x + 1, jnz1_y + 1, jnz1_width - 3, jnz1_width - 3)
                    textCtx.fillRect(jnz1_x + 1, jnz2_y + 1, jnz1_width - 3, jnz1_width - 3)
                    //计算文本的位置信息
                    text_x = imahe_left
                    text_y = 209.367 * zoom
                    text_maxwidth = 235.77975 * zoom
                    text_line = 16.8345 * zoom
                    text_xhx_hd = 2.5155 * zoom
                    text_sm_x = 288.79875 * zoom
                    text_sm_y = 250.29225 * zoom
                    text_sm_width = 79.335 * zoom
                    //计算底部删除像素信息，用在保存图片是去除莫名奇妙的阴影以及横线被覆盖的问题
                    xbimage_x = 0
                    xbimage_y = 183.825*zoom
                    xbimage_width = width
                    xbimage_height = 106.425*zoom
                     //添加时间
                     time_text = getCurTime()
                     var text_size = 15 * zoom
                     textCtx.font = text_size + 'px' + " sans-serif";
                     textCtx.textAlign = "left"
                     time_x = text_sm_x
                     time_y = text_sm_y+text_xhx_hd+text_size
                     textCtx.fillStyle = "#000000";
                     textCtx.fillText(time_text, time_x,time_y)
                },
                bj.onerror = (e) => {
                  console('1添加背景失败', e)
                };
            }
        })
}
function canvas_image(i, url) {
    var jnz_image = textCanvas.createImage();
    jnz_image.src = url
    jnz_image.onload = (e) => {
        if (i == 1) {
            textCtx.drawImage(jnz_image, jnz1_x, jnz1_y, jnz1_width, jnz1_width)
        }
        else if (i == 2) {
            textCtx.drawImage(jnz_image, jnz1_x, jnz2_y, jnz1_width, jnz1_width)
        }
        console.log('3纪念章加载完毕')
    }
    jnz_image.onerror = (e) => {
        console.log('3纪念章加载失败', e)
    }
}
function canvas_qc(y,i) {
  if(i!=true){
    textCtx.clearRect(jnz1_x, y, jnz1_width, jnz1_width);
    textCtx.fillStyle = '#ffffff';
    textCtx.fillRect(jnz1_x, y, jnz1_width, jnz1_width)
    textCtx.fillStyle = 'rgb(243, 225, 192)';
    textCtx.fillRect(jnz1_x + 1, y + 1, jnz1_width - 5, jnz1_width - 5)
  }else if(i==true){
    textCtx.clearRect(jnz1_x, y, jnz1_width, jnz1_width);
    textCtx.fillStyle = '#ffffff';
    textCtx.fillRect(jnz1_x, y, jnz1_width, jnz1_width)
  }
}
function text_jy(text,bc) {
  return new Promise((cg, sb) => {
    if(text==null||text==''){
      cg()
      return 
    }
    var text_size = 15 * zoom
    //一行最多几个字
    var yhjgz = parseInt(text_maxwidth/text_size);
    //计算一行的宽度
    var text_yhsjkd = yhjgz*text_size
    //计算内边距
    var padding = (text_maxwidth-text_yhsjkd)/2
    var text_xx =text_x+padding
    textCtx.font = text_size + 'px' + " sans-serif";
    textCtx.textAlign = "left"
    if(bc!=true){
      textCtx.shadowColor = 'rgba(0, 0, 0, 0)'; // 将阴影颜色设置为完全透明
      textCtx.shadowBlur = 0; // 将阴影模糊度设置为0
      textCtx.shadowOffsetX = 0; // 将阴影X偏移设置为0
      textCtx.shadowOffsetY = 0; // 将阴影Y偏移设置为0
      textCtx.clearRect(text_xx, text_y - text_line, text_maxwidth, text_line);
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(text_xx, text_y - text_line, text_maxwidth, text_line)

      textCtx.clearRect(text_xx, text_y + text_xhx_hd, text_maxwidth, text_line);
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(text_xx, text_y + text_xhx_hd, text_maxwidth, text_line)

      textCtx.clearRect(text_xx, text_y + text_xhx_hd * 2 + text_line, text_maxwidth, text_line);
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(text_xx, text_y + text_xhx_hd * 2 + text_line, text_maxwidth, text_line)

      textCtx.clearRect(text_xx, text_y + text_xhx_hd * 3 + text_line * 2, text_maxwidth, text_line);
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(text_xx, text_y + text_xhx_hd * 3 + text_line * 2, text_maxwidth, text_line)
    }
    textCtx.fillStyle = "#000000";
    setTimeout(() => {
        var y = text_y - text_xhx_hd
        //拆分字符串
        var words = text.split('')
        //初始化累加值
        var res = '';
        //初始化添加值
        var line = '';
        for (var i = 0; i < words.length; i++) {
            res += words[i]
            //测量文本的宽度
            var text_length = textCtx.measureText(res).width
            //大于最大的高度
            if (text_length > text_maxwidth && i > 0) {
                //输出文本
                textCtx.fillText(line, text_xx, y)
                y += text_line + text_xhx_hd
                res = words[i]
            } else {
                if (words[i] == '\n') {
                    textCtx.fillText(line, text_xx, y)
                    y += text_line + text_xhx_hd
                    res = ''
                }
                line = res
            }
        }
        if (res != '') {
            textCtx.fillText(res, text_xx, y)
        }
    }, 0)
  cg('添加完成')
  })
}
function text_smtj(text,bc) {
  console.log('bc',bc)
  if(text==null||text==''){
    return
  }
    var text_size = 15 * zoom
    textCtx.font = text_size + 'px' + " sans-serif";
    textCtx.textAlign = "left"
    if(bc!=true){
      textCtx.clearRect(text_sm_x, text_sm_y - text_size - text_xhx_hd, text_sm_width, text_size + text_xhx_hd);
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(text_sm_x, text_sm_y - text_size - text_xhx_hd, text_sm_width, text_size + text_xhx_hd)
    }
    textCtx.fillStyle = "#000000";
    textCtx.fillText(text, text_sm_x, text_sm_y - text_xhx_hd)
}
 /**
     * 获取当前时间
     */
   function getCurTime() {
      var date = new Date()
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      // var h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // var minute = date.getMinutes();
      // minute = minute < 10 ? ('0' + minute) : minute;
      // var second = date.getSeconds();
      // second = second < 10 ? ('0' + second) : second;
      return y + '/' + m + '/' + d +''
  }