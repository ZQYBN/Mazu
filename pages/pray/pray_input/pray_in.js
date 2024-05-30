var page = undefined;
Page({
    onLoad: function () {
        page = this;
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage']
        });
        const systemInfo = wx.getSystemInfoSync();
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight
        // 标题栏高度
        let titleHeight = 46
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight,
            currentTags: this.data.tags_study,
        })
    },
    back_page: function () {
        wx.navigateBack({
            delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
        })
    },
    onShareAppMessage: function () {
        return {
            title: '祈福',
            path: '/pages/pray', 
           
        };
    },

    bindbt: function () {
        doommList.push(new Doomm("第", "次祈福", Math.ceil(Math.random() * 100), 3));
        
        this.setData({
            doommData: doommList
        }) 
        this.setData({
          buttonStyle: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E5%9B%BE%E7%89%873.png?sign=b2d2ca11a9b857c037e383c21e457395&t=1715005678'
        }); 
        wx.vibrateShort({
          success: function () {
            console.log('手机震动成功');
          },
          fail: function () {
            console.log('手机震动失败');
          }
        });
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E6%9C%A8%E9%B1%BC%E5%A3%B0%E9%9F%B3.mp3?sign=74c98dea8cbc48719de550eadc312723&t=1715008483'; // 替换成您的音乐文件的URL
        innerAudioContext.play();
        
        innerAudioContext.onPlay(() => {
          console.log('音乐播放开始');
        });
        
        innerAudioContext.onError((res) => {
          console.log('音乐播放错误', res.errMsg);
        });
       
    },
    change:function(){
      var that = this;
    // 点击按钮后，样式变为新图片
    this.setData({
      buttonStyle: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/ready1.png?sign=40a947fbf4593c8f722161bdf85c7389&t=1715004448'
    });
    },
   

    data: {
        doommData: []
    },
    data: {
        members: ["妈祖娘娘护渔船，风波不惊海天晴。", "风浪翻滚海天黑，妈祖娘娘护平安。", "海天一色妈祖神，船儿载满归港春。", "妈祖文化传千古，海上航行得保佑。", "渔民祈福妈祖庇，海天一色祥和气。"],
        inputValue: '', // 输入框的值
        receiveValue: '', // 接收框的值
        animationStyle: '', // 动画样式
        buttonStyle: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/ready1.png?sign=40a947fbf4593c8f722161bdf85c7389&t=1715004448' ,
        buttonStyle1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E8%B5%84%E6%BA%90%204xxxhdpi.png?sign=209898572ee5c00ba6a4cd94e024252b&t=1715087008', 
        doommData1:'',
        isClicked: false,
        show:false,
    },
    showText: function() {
      this.setData({
        show: true
      });
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 500); // 文字显示2秒后消失，可以根据需要调整时间
    },


    bindbt1: function () {
      this.setData({
        buttonStyle1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E8%B5%84%E6%BA%90%205xxxhdpi.png?sign=93adc68eab348411901e50a2372afdb7&t=1715090200'
      })
      wx.vibrateShort({
        success: function () {
          console.log('手机震动成功');
        },
        fail: function () {
          console.log('手机震动失败');
        }
      });
      const innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.src = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E9%92%B1%E5%A3%B0%E9%9F%B3.mp3?sign=7c88dd01e64811e3be2e077d0e62768a&t=1715087865'; // 替换成您的音乐文件的URL
      innerAudioContext.play();
      
      innerAudioContext.onPlay(() => {
        console.log('音乐播放开始');
      });
      
      innerAudioContext.onError((res) => {
        console.log('音乐播放错误', res.errMsg);
      });
     
  },
  change1:function(){
    var that = this;
  // 点击按钮后，样式变为新图片
  this.setData({
    buttonStyle1: 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/%E8%B5%84%E6%BA%90%204xxxhdpi.png?sign=209898572ee5c00ba6a4cd94e024252b&t=1715087008'
  });
  },

    inputChange(e) {
        this.setData({
            inputValue: e.detail.value,
        });
    },

    // 点击发送按钮触发
    sendMessage() {
        const inputValue = this.data.inputValue;
        if (inputValue) {
            // 设置接收文本框的值
            this.setData({
                receiveValue: inputValue,
            });

            // 执行从右往左的动画
            this.runAnimation();

            // 清空输入框的值
            this.setData({
                inputValue: '',
            });
        }
    },
    // 执行从右往左的动画
    runAnimation() {
        const animation = wx.createAnimation({
            duration: 3000,
            timingFunction: 'linear',
        });
        animation.translate(450).step()
        this.setData({
            animationStyle: animation.export(),
        });
        // 动画执行完毕后清空接收框的值
        setTimeout(() => {
            animation.translate(-450).step();
            this.setData({
                receiveValue: '',
                animationStyle: animation.export()
            });
        }, 3000);
    },
    // 返回按钮
    // navigateBack: function() {
    //   // 调用wx.navigateBack()函数返回上一个页面
    //   wx.navigateBack({
    //     delta: 1  // 返回上一页，若需要返回多级页面，可以设置delta值为相应的层级数
    //   })
    // },
})
var doommList = [];
var i = 1;//用做唯一的wx:key
class Doomm {
    constructor(text, text1, top, time, color) {
        this.text = text + i + text1;
        this.top = top;
        this.time = time;
        this.color = color;
        this.display = true;
        let that = this;
        this.id = i++;

        setTimeout(function () {
            doommList.splice(doommList.indexOf(that), 1);//动画完成，从列表中移除这项
            page.setData({
                doommData: doommList
            })
        }, this.time * 200)//定时器动画完成后执行。
    }
}
function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}
