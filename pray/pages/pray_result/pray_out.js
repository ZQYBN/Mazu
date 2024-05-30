// pages/pray/pray_result/pray_out.js
var draw = require('../../../pray/utils/draw');
var BlueLM_70B = require('../../../utils/BlueLM-70B');
var rx1 = '你是一个解签小助手，你需要帮助用户解签'
var rx2 = '你是一个解读典故的小高手，你需要解释用户提供的典故'
var url =require('../../img/签文') 
const app = require('../../../utils/watch')
//画布的实例
var textCtx;
let textCanvas
var dpr;
var zoom;
var zoom2
Page({
    /**
     * 页面的初始数据
     */
    data: {
      //主题
      theme:'',
      //二级标签
      DIY_Content:'',
      output:'',
      output2:'',
      url:url,
      canvas:false,
      start1:'',
      start2:'',
    },
    navigateToPage: function () {
        console.log("调用了 navigateToPage 函数");
        wx.navigateTo({
            url: '/pages/pray/pray_input/pray_in' // 跳转至pray——result页面
        });
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
      const systemInfo = wx.getSystemInfoSync();
      // 状态栏高度 
      let statusBarHeight = systemInfo.statusBarHeight
      // 标题栏高度
      let titleHeight = 46
      //屏幕高度
      let screenHeight = systemInfo.screenHeight;
      //屏宽度
      let screenWidth = systemInfo.screenWidth;
      //底部留空
      let heigt_anq = statusBarHeight+titleHeight+20 
      this.setData({
        statusBarHeight: statusBarHeight,
        titleHeight: titleHeight,
        currentTags: this.data.tags_study,
        theme:options.主题,
        DIY_Content:options.子标签,
        heigt_anq:heigt_anq,
        screenHeight:screenHeight,
        screenWidth:screenWidth,
      })
      draw.draw().then(data=>{
        console.log( data)
          var i = data[0];
          var url =  qh(i)
          var qw_url = url[0];
          var qh_url = url[1];
          var qy = data[1].split('。')[0].split('，');
          var dg = data[2];
          var qy1 = qy[0];
          var qy2 = qy[1];
          var qy3 = qy[2];
          var qy4 = qy[3]
          setTimeout(()=>{
          this.setData({
            i:'第'+i+'签',
            qw1:qy1,
            qw2:qy2,
            qw3:qy3,
            qw4:qy4,
            dg:dg,
            qw_url:qw_url,
            qh_url:qh_url,           
            })
          },50)
        var data = '我从妈祖庙里抽到的签文是:'+qy1+qy2+qy3+qy4+'。'
        if(this.data.DIY_Content!=''){
          data += '我想咨询的内容是:'+this.data.DIY_Content
          console.log(data)
        }
        else if(this.data.DIY_Content==''){
          if(this.data.theme!='脑洞大开'){
            data += '我想咨询的内容是:'+this.data.theme
          }
        }
        console.log(data)
        console.log('典故:'+dg)
        BlueLM_70B.BlueMe_70B(this,'output',data,0,'start1',rx1,'','').then(cg=>{
          if(dg!=''&&dg!=null&&dg!=' '){
            BlueLM_70B.BlueMe_70B(this,'output2',dg,0,'start2',rx2,'','').then(cg=>{})
          }
          else{
            this.setData({
              output2:'此签暂无典故',
              start2:false
            })
          }
        })
      })
      app.watch(this,{
        start2:function name(data) {
        //脚本的bug监听变化会少一次
          setTimeout(()=>{
            if(this.data.start2==false){
              console.log('签语解析完毕')   
              wx.createSelectorQuery().selectAll('.view1').boundingClientRect().exec((res)=>{            
                this.setData({
                  qyjd_height:res[0][0].height,
                  dgjd_height:res[0][1].height
                })
              })
              wx.createSelectorQuery().select('.view').boundingClientRect().exec((res)=>{            
                this.setData({
                  qqjg_height:res[0].height
                })
              })                                   
            }   
          },200)
        }
      });
    },
    bcjrys:function(){
      if(this.data.qyjd_height!=null){
        this.setData({
          canvas:true,
        })
        this.canvas(this.data.screenWidth,this.data.screenHeight);
      }else if(this.data.qyjd_height==null){
        hideLoading(null);
      }
    },
    cx:function () {
      this.setData({
        canvas:false,
      })
    },
    canvas:function (width,height) {
      var i = 1;
      //显示加载
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      //计算缩放比例
      //以苹果15pro为基准，让画布高度铺满屏幕
      var zoom1 = (width/430)
      //画布中内容的缩放比例
      zoom2 = ((height-229*zoom1)/this.data.qqjg_height)
      //首先将图形变化为机型的比例，在缩小
      zoom = zoom1*zoom2
      console.log('画布内容缩放比例:'+zoom2)
      this.setData({
        canvas_height:height-229*zoom1,
        canvas_width : 430*zoom1*zoom2
      })
      //查询画布
      wx.createSelectorQuery().select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        //得到画布信息
        textCanvas = res[0].node;  
        //使用2d渲染上下文
        textCtx = textCanvas.getContext('2d');  
        /**至此，textCanvas，textCtx已经成功获取到，下面代码为绘图测试代码可根据自己需要修改**/
        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        console.log('画布的宽度:'+width)
        const height = res[0].height
        // 初始化画布大小
        dpr = wx.getWindowInfo().pixelRatio//获取屏幕比例,用来解决渲染画布模糊的问题
        //放大
        textCanvas.width = width * dpr
        textCanvas.height = height * dpr
        //缩放画布以确保绘制的内容不会因为像素比而变得模糊
        textCtx.scale(dpr, dpr)
        //去除画布的内容
        textCtx.clearRect(0,0,width,height)
        //开启新路径
        textCtx.beginPath();
        //第一步添加背景
        textCtx.fillStyle = 'rgb(247, 240, 231)';
        textCtx.fillRect(0, 0,width,height );
        //第二部添加签语背景
        //添加图片
        const bg = textCanvas.createImage();
        bg.src = this.data.url;
        bg.onload = (e) => {
          textCtx.drawImage(bg, 0, 0, 430*zoom, 247*zoom)
          console.log('背景:')
          console.log(e)
          i++
          hideLoading(i)
          //第三部在加载完成背景之后再加载字体图片
          //添加字体
          //left 是元素最左侧的点到视口左边缘的水平距离。
          //right 是元素最右侧的点到视口左边缘的水平距离。
          //计算签文的x和y
          var text_left = 108.33333587646484
          var left_right = 321.6633587646484
          var qw_x = (text_left-5)*zoom
          var qw_y = 45*zoom
          var qw_width = 211.33*zoom
          var qw_height =  163.33*zoom
          var qh_x = (left_right)*zoom
          var qh_y = 35*zoom
          var qh_width  = 11.6*zoom*1.3;
          if(this.data.i.length==3){
            var qh_height = 23.75*zoom*1.3
          }
          else if(this.data.i.length==4){
            var qh_height = 30.075*zoom*1.3
          }
          else if(this.data.i.length==5){
            var qh_height = 36.4*zoom*1.3
          }     
          const qw = textCanvas.createImage();
          qw.src = this.data.qw_url
          //加载成功
          qw.onload = (e) => {
            textCtx.drawImage(qw, qw_x, qw_y, qw_width, qw_height)
            console.log('签文:')
            console.log(e)
            i++
            hideLoading(i)
          }
          //加载失败
          qw.onerror = (e) => {
            console.error('签文图片加载失败:');
            console.error(e);
            hideLoading(false)
          };
          const qh = textCanvas.createImage();
          qh.src = this.data.qh_url
          qh.onload = (e) =>{
            textCtx.drawImage(qh, qh_x, qh_y, qh_width, qh_height)
            console.log('签号:')
            console.log(e)
            i++
            hideLoading(i)
          }
          qh.onerror = (e) => {
            console.error('签文图片加载失败:');
            console.error(e);
            hideLoading(false)
          };   
        }
        bg.onerror = (e) => {
          console.error('签文图片加载失败:');
          console.error(e);
          hideLoading(false)
        };
        //最后加载解读部分
        //头
        var qyjd_head_x = 17*zoom
        var qyjd_head_y = (240+17)*zoom
        var qyjd_head_width = 396*zoom
        var qyjd_head_height = 48.5369*zoom
        const qyjd_head = textCanvas.createImage();
        qyjd_head.src = '../../img/qyjd_head.png'
        qyjd_head.onload = (e) =>{
          textCtx.drawImage(qyjd_head, qyjd_head_x, qyjd_head_y, qyjd_head_width, qyjd_head_height)
        }
        //体
        var qyjd_x = qyjd_head_x
        var qyjd_y = qyjd_head_y+qyjd_head_height
        var qyjd_width = 396*zoom;
        var qyjd_head_tail = 20.80155624*zoom
        //this.data.qyjd_heigh为实时的机型高度
        var qyjd_height = (this.data.qyjd_height*zoom2-qyjd_head_height-qyjd_head_tail)
        var qyjd_tail_y = qyjd_y+qyjd_height
        //绘制正方形
        textCtx.fillStyle = 'rgb(243, 225, 192)';
        textCtx.fillRect(qyjd_x, qyjd_y-1, qyjd_width, qyjd_height+2);
        //尾
        const qyjd_tail = textCanvas.createImage();
        qyjd_tail.src = '../../img/tail.png'
        qyjd_tail.onload = (e) =>{
          textCtx.drawImage(qyjd_tail, qyjd_head_x,qyjd_tail_y, qyjd_head_width, qyjd_head_tail)
          //在尾巴图片加载完成后加载，保证可以覆盖在尾部图片之上
          // 文本
          var text = this.data.output
          var text_size = 19*zoom+'px'
          textCtx.font = text_size+" sans-serif";
          //字体的高度
          var textheight = parseInt(textCtx.font);
          //计算内边距和行间距
          var qwjd_line = line_space(textheight,zoom,text,qyjd_head_width-19,qyjd_height)
          //内边距
          var qwjd_padding = qwjd_line[0]
          //行间距
          var qwjd_text_line = qwjd_line[1]
          //对齐方式
          textCtx.textAlign = "left"
          textCtx.fillStyle = "#000000";
          canvas_text_hh(textCtx,text,qyjd_x+qwjd_padding,qyjd_y+textheight,qyjd_head_width-19,qwjd_text_line)
          i++
          hideLoading(i)
        }
        var qyjd_gaodu = (qyjd_head_height+qyjd_height+qyjd_head_tail)  
        console.log('对应的签语解读文字实际宽度:'+qyjd_head_width)
        console.log('对应的签语解读文字实际高度:'+qyjd_height)
        console.log('对应的签语解读实际高度:'+qyjd_gaodu/zoom2)
        //添加历史故事
        //头
        var lsgs_head_x = qyjd_head_x;
        var lsgs_head_y = qyjd_tail_y+qyjd_head_tail+17*zoom
        const lsgs_tead = textCanvas.createImage();
        lsgs_tead.src = '../../img/dgjd_head.png'
        lsgs_tead.onload = (e) =>{
          textCtx.drawImage(lsgs_tead, lsgs_head_x,lsgs_head_y, qyjd_head_width, qyjd_head_height)
        }
        //体
        var lsgs_x =  qyjd_head_x;
        var lsgs_y = lsgs_head_y+qyjd_head_height;
        var lsgs_width =  qyjd_head_width;
        var lsgs_height = this.data.dgjd_height*zoom2-qyjd_head_height-qyjd_head_tail;
        textCtx.fillRect(lsgs_x, lsgs_y-1, lsgs_width, lsgs_height+2);
        //尾
        var lsgs_tail_y = lsgs_y+lsgs_height
        const lsgs_tail = textCanvas.createImage();
        lsgs_tail.src = '../../img/tail.png'
        lsgs_tail.onload = (e) =>{
          textCtx.drawImage(lsgs_tail, qyjd_head_x,lsgs_tail_y, qyjd_head_width, qyjd_head_tail)
          setTimeout(()=>{
          //添加历史典故
          //使用居中对齐
          textCtx.textAlign  = 'center'
          var text_lsdg_size = 22*zoom+'px'
          textCtx.font = text_lsdg_size+" sans-serif";
          //计算高度
          //字体的高度
          var lsdg_textheight = parseInt(textCtx.font);
          var lsdg_x = (lsgs_x*2+qyjd_head_width)/2 ;
          var lsdg_y = lsgs_head_y+qyjd_head_height+lsdg_textheight
          console.log(this.data.dg)
          // textCtx.fillText(this.data.dg,lsdg_x,lsdg_y)
          var gaodu_y=canvas_text_hh(textCtx,this.data.dg,lsdg_x,lsdg_y,qyjd_head_width-19,lsdg_textheight)
          //添加典故的解读
          var text_lsdg_size = 19*zoom+'px'
          textCtx.font = text_lsdg_size+" sans-serif";
          textCtx.textAlign  = 'left'
          var lsdg_text_textheight = parseInt(textCtx.font);
          var dgjd_text = this.data.output2
          var dgjd_text_x = lsgs_x
          var dgjd_text_y = gaodu_y+lsdg_textheight
          //计算内边距和行间距
          var dgjd_line = line_space(lsdg_text_textheight,zoom,dgjd_text,lsgs_width-19,lsgs_height-(gaodu_y-lsgs_y))
          //内边距
          var dgjd_padding = dgjd_line[0]
          //行间距
          var dgjd_text_line = dgjd_line[1]
          canvas_text_hh(textCtx,dgjd_text,dgjd_text_x+dgjd_padding,dgjd_text_y,qyjd_head_width-19,dgjd_text_line)
          i++
          hideLoading(i)
          },0)         
        }
        var lsgs_gaodu = qyjd_head_height+lsgs_height+qyjd_head_tail
        console.log('对应的实际历史故事高度:'+lsgs_gaodu/zoom2)
      })
    },
    canvas_image:function name(params) {
      return new Promise((cg,sb)=>{
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.data.canvac_width,
          height: this.data.canvac_height,
          destWidth: this.data.canvac_width*dpr/zoom2 , // 输出图片的宽度
          destHeight: this.data.canvac_height*dpr/zoom2 , // 输出图片的高度
          canvas: textCanvas, // 传入canvas实例
          fileType: 'png',
          success(res) {
            cg(res.tempFilePath)
            console.log('图片保存成功',res.tempFilePath);
          },
          fail(res) {
            console.log('导出图片失败', res);
          }
        });
      })
    },
    bctp:function () {
      this.canvas_image().then(cg=>{
        // 保存图片到相册
        wx.saveImageToPhotosAlbum({
          filePath: cg,
          success(res) {
            console.log('图片已保存到相册', res);
          },
          fail(res) {
            console.log('保存图片失败', res);
          }
        });
      }).catch(sg=>{
      })
    },
    wxhy:function () {
      this.canvas_image().then(cg=>{  
        wx.showShareImageMenu({  //分享给朋友
          path: cg,
          success: (res) => {
              console.log("分享成功：", res);
          },
          fail: (err) => {
              console.log("分享失败：", err);
            }
          })
      }).catch(sg=>{
      })
    },
    wxpyq:function () {
      this.canvas_image().then(cg=>{  
      }).catch(sg=>{
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

    },
   
})
//导入签文信息给画布
function qh(qh){
  var url = []
  switch(qh){
    case'一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/1.png?sign=a367a1f92f97edf4e8f374f1bde531de&t=1715251192','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh1.png?sign=c6dace1e314c95f0cf3716573768ca66&t=1715251216')
      break;
    }
    case'二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/2.png?sign=47f5b7111d5ea60d4803f30c759e786c&t=1715251267','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh2.png?sign=8ac8d1ab081a874c89ec46f474f0b5ce&t=1715251282')
      break;
    }
    case'三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/3.png?sign=087ab927e5004a3f76da73ffcad62e51&t=1715251318','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh3.png?sign=ddde757aafc4bbe2b33b7f8ea4541414&t=1715251331')
      break;
    }
    case'四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/4.png?sign=11b29c270bd38eeab37e37f721a84841&t=1715251351','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh4.png?sign=ed58d9c7f0b170bae9fe1b128b5cd5e2&t=1715251362')
      break;
    }
    case'五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/5.png?sign=47e54d705c63805cd0b5bdbe0134592b&t=1715251385','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh5.png?sign=cd6b41d0e1cf167e77dd60b01e4ddab9&t=1715251397')
      break;
    }
    case'六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/6.png?sign=84095271555af29edb94fafcf957a7b4&t=1715251419','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh6.png?sign=567b781a831de7d34292a5ea8ded3d69&t=1715251428')
      break;
    }
    case'七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/7.png?sign=d11a12a07fd641f180bc730467fb35d9&t=1715251446','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh7.png?sign=6327aed8378c5a2ca660afc087ac2aa3&t=1715251462')
      break;
    }
    case'八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/8.png?sign=5aaefb64e305e089f0a783059ba39bb0&t=1715251483','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh8.png?sign=a15c1bcefe91a531ba52efcf5bbd6f11&t=1715251498')
      break;
    }
    case'九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/9.png?sign=2bce203ddfe36791584f9b98cc13fdf4&t=1715251512','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh9.png?sign=16d955fdf44ac34810346e19dd1832b1&t=1715251522')
      break;
    }
    case'十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/10.png?sign=11bc086b1fd152800eba20b25075cac0&t=1715251542','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh10.png?sign=1cbc04eae80dcd507e82c27eb83d32c7&t=1715252832')
      break;
    }
    case'十一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/11.png?sign=fc158bb3d3c856fdca305b811a3624e3&t=1715251567','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh11.png?sign=973d8708e9593eaa5d32f0cca87d7f6a&t=1715251577')
      break;
    }
    case'十二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/12.png?sign=6c01a5fee86f3e45079d1999feeb9c68&t=1715251760','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh12.png?sign=0afb3e64df409cdabdc3d8144ad135c2&t=1715251773')
      break;
    }
    case'十三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/13.png?sign=2747163e36d2b8f5e04df86ef8145a9f&t=1715251783','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh13.png?sign=defbe8c6274bef40feaa206792043b10&t=1715251799')
      break;
    }
    case'十四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/14.png?sign=889d4cf95be49150b87b646629d8ae69&t=1715251811','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh14.png?sign=7c3b3b564d70d7878dea21e2b5daa83f&t=1715251821')
      break;
    }
    case'十五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/15.png?sign=3ece30636d6a43415818d0ad2174db8b&t=1715251829','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh15.png?sign=a8f1b86a50b5da55018f58bcdd0426ba&t=1715251838')
      break;
    }
    case'十六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/16.png?sign=158bc49ca98a5fc3add4981dfcef1f3f&t=1715251848','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh16.png?sign=727a1a6d47259545fb86f89507e4f9cb&t=1715251859')
      break;
    }
    case'十七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/17.png?sign=d7ec5a9c5b9815adc1b8e633c3510dc2&t=1715251870','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh17.png?sign=6a3ee022cc4706f5d9afd82c034a7662&t=1715251880')
      break;
    }
    case'十八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/18.png?sign=ad78b6cdb32952f717b48a3a64806017&t=1715251890','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh18.png?sign=c7fd75ef8ae61b8832da60fa1cc20336&t=1715251900')
      break;
    }
    case'十九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/19.png?sign=aee4e170929af11d44e89fa0930d8cbc&t=1715251909','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh19.png?sign=06480eec6278b66a2eb9ac4108083d6f&t=1715251918')
      break;
    }
    case'二十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/20.png?sign=77e2c0cf4c2b836236ccb4f690acbf5c&t=1715251929','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh20.png?sign=b6549171f6ae24f230fb941fb107f603&t=1715251938')
      break;
    }
    case'二十一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/21.png?sign=84cffaecf90d172aecd30100edc969d6&t=1715251948','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh21.png?sign=fbecc66d0a19904ad4046eed760d035d&t=1715251959')
      break;
    }
    case'二十二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/22.png?sign=1fc268425256cc7e74c71c4d78093f8d&t=1715251976','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh22.png?sign=4d44e73cc78d70bec1e9f0d658eb12e2&t=1715251986')
      break;
    }
    case'二十三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/23.png?sign=cb4edd2e7cc5d658865df758f3ebc32f&t=1715251996','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh23.png?sign=0182d6f8a909032a50ad6f3409f6be1a&t=1715252007')
      break;
    }
    case'二十四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/24.png?sign=37a6406967d65a7c65a807de3a6b631d&t=1715252017','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh24.png?sign=71bdb031e791201f84103b31b3e25cd3&t=1715252027')
      break;
    }
    case'二十五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/25.png?sign=a7ed3c05bb0d1b4177eedb4c8ee3f91f&t=1715252037','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh25.png?sign=bbc77878d5fe439ef810758c9f94d28a&t=1715252047')
      break;
    }
    case'二十六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/26.png?sign=cb3449ee41ef8fc1864bc73e7e866eb4&t=1715252058','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh26.png?sign=e505a7f108f1f430889757a8db2a0650&t=1715252067')
      break;
    }
    case'二十七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/27.png?sign=60a676fe3ea442a41e90c538f611213f&t=1715252077','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh27.png?sign=3785500d626ae2b25353548c6a8bde82&t=1715252086')
      break;
    }
    case'二十八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/28.png?sign=976e7cddbffe1b70da0f0e86df62a179&t=1715252096','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh28.png?sign=35f0c283efe8ecf15d7c47cb1649c054&t=1715252105')
      break;
    }
    case'二十九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/29.png?sign=95f2b2db6f9675b13c469fcd009372a0&t=1715252116','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh29.png?sign=f58d246190c17b9c87f9be71162cf8f6&t=1715252130')
      break;
    }
    case'三十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/30.png?sign=f982bb2872b5e38f15fdd1b3dba38378&t=1715252142','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh30.png?sign=760bab6cac1d16ca40a1ae3081b91059&t=1715252152')
      break;
    }
    case'三十一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/31.png?sign=b2ee6954cfd2232392b8f37ca69500bb&t=1715252190','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh31.png?sign=df5c8d1d5bf1157769ce39ae955dab6a&t=1715252207')
      break;
    }
    case'三十二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/32.png?sign=2d38b40351429c79b4c4d8cf480eba38&t=1715252215','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh32.png?sign=76854f11e0c5423c49c41bf26a205cba&t=1715252224')
      break;
    }
    case'三十三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/33.png?sign=f66326431420e2036390ca23fabdb075&t=1715252234','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh33.png?sign=f282d9932e4ef67a6c37b2077b09d0bd&t=1715252242')
      break;
    }
    case'三十四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/34.png?sign=5d28ec80709c34b0082fd553d5f3c69b&t=1715252252','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh34.png?sign=fec7a53d18933711df9e02e00b5b4c8e&t=1715252261')
      break;
    }
    case'三十五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/35.png?sign=026ce55dbbaab0b55505f9ca04c5e7d7&t=1715252270','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh35.png?sign=211390e44713b0314fe0fb456c02b831&t=1715252280')
      break;
    }
    case'三十六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/36.png?sign=fb8945d679b547f79de1166009afbdc1&t=1715252289','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh36.png?sign=314db2f9e30ec318c93531fe1d10714c&t=1715252298')
      break;
    }
    case'三十七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/37.png?sign=cf5dbcc91d8fb6a17ee567e29fc1f9c3&t=1715252311','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh37.png?sign=40a27cd5e4486b6afc50cbba29e5b072&t=1715252319')
      break;
    }
    case'三十八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/38.png?sign=0aea9691f0c09e6b64d44572e217e3b6&t=1715252328','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh38.png?sign=484dfb209aa6ecb65f17eb965cd2a435&t=1715252336')
      break;
    }
    case'三十九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/39.png?sign=86e0a8b1e945a09fce570c870a7ef3d4&t=1715252345','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh39.png?sign=c199af2de0ba8eb3a23442483562b055&t=1715252353')
      break;
    }
    case'四十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/40.png?sign=6f2d4ec035ddc28665942eb974fa353b&t=1715252362','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh40.png?sign=2bc0a89b17ed1cae680b21571dd8db04&t=1715252373')
      break;
    }
    case'四十一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/41.png?sign=0515466f9233cc4e1db5aaa3c89b5512&t=1715252382','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh41.png?sign=d289dae166a4efb63e6fafea81279e15&t=1715252391')
      break;
    }
    case'四十二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/42.png?sign=f6744426e9ae831f5e255a8f53640290&t=1715252404','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh42.png?sign=abb46e5fa9d66e8358505dcafc35c181&t=1715252413')
      break;
    }
    case'四十三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/43.png?sign=22edc88b8e566c801dc8b62fd6269295&t=1715252423','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh43.png?sign=8fef8944167facadecb411d783fbb61a&t=1715252432')
      break;
    }
    case'四十四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/44.png?sign=64171ceb1dc7cbb7b95586acf8e2b03a&t=1715252441','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh44.png?sign=64171e1ddbc937f622ee4cf366914703&t=1715252448')
      break;
    }
    case'四十五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/45png.png?sign=38d250da20e88a35c78f3d3187e8ebbe&t=1715252459','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh45.png?sign=15499bd416324c7a7349e1a8ed6056bb&t=1715252468')
      break;
    }
    case'四十六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/46.png?sign=23a25d438258f06cd5e22d7b17b91f47&t=1715252476','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh46.png?sign=c2585cef1262592bfb85cb8a12e4ee5c&t=1715252486')
      break;
    }
    case'四十七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/47.png?sign=6c2a94ad9a7960d5d9913553590c03fc&t=1715252494','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh47.png?sign=ac6c22d74864aa1ad716374e3f7c9374&t=1715252504')
      break;
    }
    case'四十八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/48.png?sign=513e825d20aafc139a6dc81018a35446&t=1715252512','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh48.png?sign=fec34716fa346f369d19c1b5a22bda9c&t=1715252520')
      break;
    }
    case'四十九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/49.png?sign=a6bae1c6748c94bbebdab6788088e43a&t=1715252530','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh49.png?sign=7e307425b33551b29b1c6c96b584ad92&t=1715252539')
      break;
    }
    case'五十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/50.png?sign=9e71ae7fc53ea517a0fa3ce87b58316c&t=1715252547','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh50.png?sign=692741cf58e85d36d332a5fe9e4fd7c9&t=1715252555')
      break;
    }
    case'五十一':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/51.png?sign=62386fa82c58a5f020fda0dd9e01712b&t=1715252565','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh51.png?sign=e25ecd9235d842c844c7c9f6131a767a&t=1715252572')
      break;
    }
    case'五十二':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/52.png?sign=b66f644ac2aeb3582854b8c71f8c0a22&t=1715252583','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh52.png?sign=399a8b34932869d9c94346fdee8ec1f3&t=1715252592')
      break;
    }
    case'五十三':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/53.png?sign=8c27d8f5484906c038d351116a4d678d&t=1715252601','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh53.png?sign=32705b42b1f0002d3269d105a345ccbd&t=1715252609')
      break;
    }
    case'五十四':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/54.png?sign=cb13a8f6c002c4d0d4c3399cdf47aac6&t=1715252623','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh54.png?sign=b67ebe937a7490903c9ec444016ec18a&t=1715252632')
      break;
    }
    case'五十五':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/55.png?sign=3afa9121e79816015a9903c09b166bc9&t=1715252641','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh55.png?sign=78a149e929a3c27a100e2235454f9095&t=1715252649')
      break;
    }
    case'五十六':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/56.png?sign=e1d383b6a5afb9e782ded27c8aacb451&t=1715252657','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh56.png?sign=b4cf5b244c587fe856d9ce54e5d307fe&t=1715252667')
      break;
    }
    case'五十七':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/57.png?sign=a8002bfb77afe1ba60d0f2427063743e&t=1715252677','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh57.png?sign=fe3d85b9b387cec34a1de9e39418729a&t=1715252686')
      break;
    }
    case'五十八':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/58.png?sign=6cc492836cff58cbb2f5269cefc00188&t=1715252696','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh58.png?sign=b9890d2c91b4b26c2059630e34fd086f&t=1715252703')
      break;
    }
    case'五十九':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/59.png?sign=4e265bc34b44bc407232c03e009f77ce&t=1715252725','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh59.png?sign=149a0a09f5b76d2e93bdf16a68930e09&t=1715252733')
      break;
    }
    case'六十':{
      url.push('https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/60.png?sign=bdcfabd9b48e91a9fe1cb7ee05395aa2&t=1715252741','https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%B1%82%E7%AD%BE%E7%BB%93%E6%9E%9C%E5%9B%BE%E7%89%87/qh60.png?sign=c0095088a2dff81c85d04c685e2963dd&t=1715252748')
      break;
    }     
  }
  // console.log(url)
  return url
}
//提示框 加载框
function hideLoading(i) {
  if(i==5){
    //隐藏加载界面
    wx.hideLoading();
    wx.showToast({
      title: '加载成功',
      icon: 'success',
      duration: 1000    //提示的延迟时间
    });
  }
  else if(i==false){
    //隐藏加载界面
    wx.hideLoading();
    wx.showToast({
      title: '加载失败',
      icon: 'error',
      duration: 1000    //提示的延迟时间
    });
  }
  else if(i==null){
    wx.showToast({
      title:'请等待AI加载',
      icon:'none',
      mask:true,
      duration:1000,
    })
  }
}
//计算字体的行间距
function line_space(textheight,zoom,text,qyjd_head_width,qyjd_height) {
    //累加行数
    var res=0
    //一行最多几个字
    var yhjgz = parseInt(qyjd_head_width/(19*zoom));
    //计算一行的宽度
    var text_width = yhjgz*(19*zoom)
    //计算内边距
    var padding = (qyjd_head_width-text_width+19)/2
    //计算行数量
    var fg = text.split('\n')
    for(var i=0;i<fg.length;i++){
      if(fg[i].length>1){
      res+=Math.ceil(fg[i].length/yhjgz)
      }else{
        res+=1
      }
    }
    //行间距
    var text_line = textheight+(qyjd_height-res*textheight)/(res-1)
    return([padding,text_line])
}
//实现画布的自动换行
function canvas_text_hh(canvas,text,x,y,maxwidth,hjj) {
  var gaodu_y = y
  //拆分字符串
  var words = text.split('')
  //初始化累加值
  var res=''
  //添加值，设置添加值让添加值的字数比累加值的字数少1，保证文本不要超过界限
  var line =''
  for(var i=0;i<words.length;i++){
    res+=words[i]
    //测量文本的宽度
    var text_length = canvas.measureText(res).width
    //大于最大的高度
    if(text_length>maxwidth&&i>0){
      //输出文本
      canvas.fillText(line,x,gaodu_y)
      gaodu_y+=hjj
      res=words[i]
    }else{
      if(words[i]=='\n'){
        canvas.fillText(line,x,gaodu_y)
        gaodu_y+=hjj
        res=''
      }
      line=res
    }
  }
  if(res!=''){
    canvas.fillText(res,x,gaodu_y)
  }
  //返回下一行的起始高度
  return gaodu_y
}
