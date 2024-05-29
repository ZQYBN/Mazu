// pages/pray/pray.js
// 在Page中定义一个动画对象
let animation = wx.createAnimation({
    duration: 100,
    timingFunction: 'linear',
});
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
// 随机颜色
function getRandomColor() {
    const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue',
        'purple'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        color: '#e2be00', // 设置初始颜色为半透明的黄色
        // 当前主题
        theme: "金榜题名",
        // 主题名字
        themeText: '金榜题名',
        // 主题列表
        themeList: [
            { color: '#e2be00', text: '金榜题名' },
            { color: 'rgba(0, 0, 255, 0.5)', text: '事业有成' },
            { color: '#458B00', text: '健康平安' },
            { color: '#FF6EB4', text: '幸福美满' },
            { color: '#696969', text: '脑洞大开' }
        ],
        // 子标签
        tags_study: [
            { text: '#考研上岸', color: 'magenta', isSelect: false },
            { text: '通过英语四六级', color: 'red', isSelect: false },
            { text: '#国考上岸', color: 'volcano', isSelect: false },
            { text: '期末不挂科', color: 'orange', isSelect: false },
            { text: '学业顺利', color: 'gold', isSelect: false },
            { text: '升学顺利', color: 'lime', isSelect: false },
            { text: '转专业成功', color: 'green', isSelect: false },
            { text: '#拿到奖学金', color: 'cyan', isSelect: false },
            { text: '取得专业证书', color: 'blue', isSelect: false },
            { text: '找到心仪导师', color: 'geekblue', isSelect: false },
        ],
        tags_work: [
            { text: '事业兴旺', color: 'magenta', isSelect: false },
            { text: '升值加薪', color: 'red', isSelect: false },
            { text: '工资加倍', color: 'volcano', isSelect: false },
            { text: '上升期加速卡', color: 'orange', isSelect: false },
            { text: '遇到好上司', color: 'gold', isSelect: false },
            { text: '#职场事业一帆风顺', color: 'lime', isSelect: false },
            { text: '职业运势旺盛', color: 'green', isSelect: false },
            { text: '#钱从四面八方来', color: 'cyan', isSelect: false },
            { text: '#薪资福报滚滚来', color: 'blue', isSelect: false },
            { text: '幸福美满', color: 'geekblue', isSelect: false },
        ],
        tags_Health: [
            { text: '#福如东海,寿比南山', color: 'geekblue', isSelect: false },
            { text: '疾病远离', color: 'blue', isSelect: false },
            { text: '出入平安', color: 'lime', isSelect: false },
            { text: '孩子健康无忧', color: 'green', isSelect: false },
            { text: '父母、长辈身体安康', color: 'cyan', isSelect: false },
            { text: '孩子健康无忧', color: 'gold', isSelect: false },
            { text: '健康快乐每一天', color: 'orange', isSelect: false },
            { text: '旅行一路顺风', color: 'magenta', isSelect: false },
            { text: '升值加薪', color: 'red', isSelect: false },
            { text: '工资加倍', color: 'volcano', isSelect: false },
        ],
        tags_Love: [
            { text: '阖家欢乐', color: 'geekblue', isSelect: false },
            { text: '健康快乐每一天', color: 'geekblue', isSelect: false },
            { text: '笑口常开', color: 'geekblue', isSelect: false },
            { text: '早生贵子', color: 'geekblue', isSelect: false },
            { text: '外出平平安安', color: 'geekblue', isSelect: false },
            { text: '孩子健康无忧', color: 'geekblue', isSelect: false },
            { text: '疾病远离', color: 'geekblue', isSelect: false },
        ],
        tags_DIY: [],   //此行不能删
        // 当前主题
        currentTags: [],
        currentType: 'study',
        currentThemeIndex: 0,
        // 步骤条状态
        current: 0,
        // 用户自定义内容和子标签的选中内容
        DIY_Content: "",
        // 是否可以抽签
        could_pray: "true",
    },
    navigateToPage: function () {
        console.log("调用了 navigateToPage 函数");
        wx.navigateTo({
            url: '/pages/pray/pray_result/pray_out' // 跳转至pray——result页面
        });
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
            titleHeight: titleHeight,
            currentTags: this.data.tags_study,
        })
    },
    back_page: function () {
        wx.navigateBack({
            delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
        })
    },
    // 点击了抽签
    start_pray() {
        console.log("点击了抽签");
        if (this.data.could_pray == "true") {
            this.setData({
                could_pray: "false",
                current: 3,
            })
            // 获取动画对象
            animation.rotate(20).translateX(10).step(); // Rotate and move to the right
            animation.rotate(-20).translateX(-10).step(); // Rotate and move to the left
            animation.rotate(20).translateX(10).step(); // Rotate and move to the right
            animation.rotate(-20).translateX(-10).step(); // Rotate and move to the left
            animation.rotate(0).translateX(0).step(); // Back to the center
            // 将动画数据导出到data中
            this.setData({
                animationData: animation.export()
            });
            // 延时500ms后恢复原状
            setTimeout(() => {
                animation.rotate(0).translateX(0).step();
                this.setData({
                    animationData: animation.export()
                });
            }, 500);
            function sleep(numberMillis) {
                var now = new Date();
                var exitTime = now.getTime() + numberMillis;
                while (true) {
                    now = new Date();
                    if (now.getTime() > exitTime)
                        return;
                }
            }
            sleep(500)
            var url = '/pray/pages/pray_result/pray_out'
            //要传输的数据
            var data = '?' + '主题=' + this.data.theme + '&' + '子标签=' + this.data.DIY_Content
            wx.navigateTo({
                url: url + data
            })
        }
    },
    // 切换主题
    change_theme: function () {
        // 设置步骤条
        this.setData({
            current: 1,
        })
        const themeList = this.data.themeList;
        const currentThemeIndex = this.data.currentThemeIndex;
        const nextThemeIndex = (currentThemeIndex + 1) % themeList.length;
        // 根据主题切换标签内容，这里可以根据实际需求进行修改
        const nextTheme = this.data.themeList[nextThemeIndex].text;

        // 随机排序标签数组
        let tags = [];
        switch (nextTheme) {
            case '金榜题名':
                tags = this.data.tags_study;
                break;
            case '事业有成':
                tags = this.data.tags_work;
                break;
            case '健康平安':
                tags = this.data.tags_Health;
                break;
            case '幸福美满':
                tags = this.data.tags_Love;
                break;
            case '脑洞大开':
                tags = this.data.tags_DIY;
                break;
            // 其他主题的处理逻辑
        }
        // 随机排序标签数组
        const randomTags = tags.sort(() => Math.random() - 0.5);
        // 为每个标签重新生成随机颜色
        const updatedRandomTags = randomTags.map(tag => {
            return {
                text: tag.text,
                color: getRandomColor(), // 重新生成随机颜色
                isSelect: tag.isSelect
            };
        });

        this.setData({
            currentTags: updatedRandomTags,//更新标签
            showTextInput: nextTheme === '脑洞大开' ? true : false, // 显示或隐藏文本输入框
            color: themeList[nextThemeIndex].color,//更新主题颜色
            theme: themeList[nextThemeIndex].text,//更新主题名字
            currentThemeIndex: nextThemeIndex,//更新主题索引
            currentTheme: nextTheme,//切换主题
            DIY_Content: ''
        });

        // 重置tag选中状态
        const currentTags = this.data.currentTags;
        for (let i = 0; i < currentTags.length; i++) {
            currentTags[i].isSelect = false;
        }
        this.setData({
            currentTags: currentTags,
        });

        console.log("当前主题：" + this.data.theme)
    },
    // 选择标签
    tag_click(e) {
        this.setData({
            current: 2,
        })
        const index = e.currentTarget.dataset.index;
        const currentTags = this.data.currentTags;
        const clickedTag = currentTags[index]; // 获取当前点击的标签对象
        currentTags.forEach((item, i) => {
            if (i === index) {
                item.isSelect = !item.isSelect;
            } else {
                item.isSelect = false;
            }
        });
        this.setData({
            currentTags: currentTags,
            DIY_Content: clickedTag.text,
        });
        console.log('当前点击的标签内容为:', clickedTag.text); // 输出当前点击的标签内容到控制台
    },
    // 获取键盘输入
    onChange(e) {
        this.setData({
            error: isTel(e.detail.value),
            DIY_Content: e.detail.value,
        }),
            console.log('用户输入：', this.data.DIY_Content)
    },
    // 键盘失去焦点
    onBlur(e) {
        this.setData({
            error: isTel(e.detail.value),
        })
        console.log('onBlur', e)
        this.setData({
            current: 2,
        })
    },
    // swiperChange: function (e) {
    //     console.log('当前所在的swiper-item索引为：', e.detail.current)
    //     let currentTheme = e.detail.current;
    //     let themeList = ['学业', '事业', '健康', '爱情', '自定义'];
    //     let currentThemeColor = this.data.themeColor[themeList[currentTheme]];
    //     this.setData({
    //         color: currentThemeColor,
    //         mode_text: themeList[currentTheme]
    //     });
    // },





    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.setData({
            could_pray: "true"
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
    onButtonPrayClick() {
        // 在这里写你想要执行的功能代码
        console.log('按钮被点击了！');
        wx.navigateTo({
            url: '/pages/pray/pray_input/pray_in'
        })
    }
})