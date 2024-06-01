Page({
  data: {
    statusBarHeight: 20,
    titleHeight: 50,
    scroll_height: 1000,
    value: '',
    activeTab: 0,
    products: [
      { id: 1, name: '商品1', price: 50.00, image: 'https://example.com/image7.jpg' }
    ]
  },
  
  onSearch(event) {
    console.log('搜索关键词:', event.detail);
    // 在这里处理搜索逻辑
  },

  onCancel() {
    console.log('取消搜索');
    // 在这里处理取消搜索逻辑
  },
  
  onLoad(options) {
    const systemInfo = wx.getSystemInfoSync();
    let statusBarHeight = systemInfo.statusBarHeight;
    let titleHeight = 46;
    const screenHeight = systemInfo.windowHeight;
    this.setData({
      statusBarHeight: statusBarHeight,
      titleHeight: titleHeight,
      scroll_height: screenHeight - statusBarHeight - titleHeight
    });
  },

  onReady() {},

  onShow() {
    this.getTabBar().setData({
      active: "WenChuang"
    });
  },

  onHide() {},

  onUnload() {},

  onPullDownRefresh() {},

  onReachBottom() {},

  onShareAppMessage() {},

  onItemTap(event) {
    const productId = event.currentTarget.dataset.productId;
    wx.navigateTo({
      url: `/pages/productDetail/productDetail?id=${productId}`,
    });
  },

  onTabChange(event) {
    this.setData({
      activeTab: event.detail.index,
    });
    // add logic to load the corresponding tab's data
  },

  onChange(event) {
    this.setData({
      value: event.detail,
    });
  },

  onClick() {
    // handle search button click
  }
});

