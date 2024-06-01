// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        //加载楷书字体
        this.loadFontFace()
    },
     loadFontFace() {
      let fontUrl = 'https://636c-cloud1-7g5vke1x7dd05544-1325794133.tcb.qcloud.la/FZKTJW.TTF?sign=13ef205bb62674bd82a4802249107fc1&t=1714918331';
      wx.loadFontFace({
        family: '楷书',
        source: fontUrl,
        global:true,
        success(e) {
          console.log(e, '楷书动态加载字体成功')
        },
        fail: function(e) {
          console.error(e, '楷书动态加载字体失败')
        }
      });
    },
    globalData: {
        userInfo: null,
        imgsrc_ai:'',
        is_return_from_ai:false,
        clockPoint: [{
            id: 0,
            name: '大牌坊',
            is_check:false
        },
        {
            id: 1,
            name: '天后宫',
            is_check:false
        },
        {
            id: 2,
            name: '妈祖石像',
            is_check:false
        }]
    }
})
//变更测试