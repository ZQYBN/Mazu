// pages/map/map.js 

//导入引入腾讯LBS的微信SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
// 实例化腾讯LBS的SDK核心类
var qqmapsdk = new QQMapWX({
    key: 'QEFBZ-NRTC3-2TJ3B-OMSXP-IRSZQ-CEB64',
});

Page({
    data: {
        key: 'QEFBZ-NRTC3-2TJ3B-OMSXP-IRSZQ-CEB64', //腾讯LBS密钥
        latitude: 25.065820705267043, //中心纬度
        longitude: 119.12646561262648, //中心经度
        scale: 13, //缩放级别
        showDialog: false, //默认不显示打卡点对话框
        currentMarker: [], //记录当前打卡点
        userLocation: null, //用户定位信息
        showRadar: false,//是否显示雷达效果，默认不显示
        showClockBotton: false,//是否显示打卡按钮，默认不显示 
        poiParams: ['住宿', '餐饮', '厕所', '便利店', '停车场', '轮渡'],//按钮的POI传入keyword参数
        category: ['酒店宾馆', '美食', '基础设施:公共设施:公共厕所', '购物', '汽车', '基础设施:交通设施:港口码头'],
        markers: [],//在地图显示的标记点
        polygons: [],//在地图显示的多边形
        mks: [],//POI响应的回传数据
        //POI点击栏
        isOnCLickPOI_zs: false,
        isOnCLickPOI_ys: false,
        isOnCLickPOI_cs: false,
        isOnCLickPOI_bld: false,
        isOnCLickPOI_tcc: false,
        isOnCLickPOI_ld: false,
        isOnCLickPOI_clock: false,
        alternativeimage_zs: '../../img/地图图标/住宿_2.png',
        alternativeimage_ys: '../../img/地图图标/饮食_2.png',
        alternativeimage_cs: '../../img/地图图标/厕所_2.png',
        alternativeimage_bld: '../../img/地图图标/便利店_2.png',
        alternativeimage_tcc: '../../img/地图图标/停车场_2.png',
        alternativeimage_ld: '../../img/地图图标/轮渡_2.png',
        alternativeimage_clock: '../../img/地图图标/定位打卡_2.png',
        currentimage_zs: '../../img/地图图标/住宿.png',
        currentimage_ys: '../../img/地图图标/饮食.png',
        currentimage_cs: '../../img/地图图标/厕所.png',
        currentimage_bld: '../../img/地图图标/便利店.png',
        currentimage_tcc: '../../img/地图图标/停车场.png',
        currentimage_ld: '../../img/地图图标/轮渡.png',
        currentimage_clock: '../../img/地图图标/定位打卡.png',

        //打卡点
        clockPoint: [{
            id: 0,
            name: '大牌坊',
            latitude: 25.090454,
            longitude: 119.14515,
            iconPath: '../../img/地图图标/大牌坊.png',
            width: 70,
            height: 70,
            category: '打卡点',
            information: '大牌坊位于位于莆田市湄洲妈祖祖庙内，大牌坊“三开重檐”,气势不凡，由中国书法大师林加国题写庙名《湄洲妈祖祖庙》。两旁长廊，雕梁画栋，依山逶迤，与大牌坊连成一体，构成祖庙的第一道风景线。',
            src: 'cloud://cloud1-7g5vke1x7dd05544.636c-cloud1-7g5vke1x7dd05544-1325794133/地图图片/大牌坊.png'

        },
        {
            id: 1,
            name: '天后宫',
            latitude: 25.091153,
            longitude: 119.148112,
            iconPath: '../../img/地图图标/天后宫.png',
            width: 70,
            height: 70,
            category: '打卡点',
            information: '天后宫，此殿始建于宋雍熙四年(公元987年),是世界上第一座妈祖庙。门口两根柱子上的对联：“齐齐齐齐齐齐齐齐齐齐戒，朝朝朝朝朝朝朝朝朝朝音”。作者是莆田明代的大才子戴大宾。古时“齐”字通“斋”字，“朝”字通“潮”字，整句话的搭配是：“齐斋，齐斋，齐齐斋，齐齐斋戒，朝潮，朝潮，朝朝潮，朝朝潮音”。劝戒人民学习妈祖无私大爱奉献精神要以实际行动来证明，就像那千百年不断潮起潮落的湄屿潮音，持之以恒!。',
            src: 'cloud://cloud1-7g5vke1x7dd05544.636c-cloud1-7g5vke1x7dd05544-1325794133/地图图片/天后宫.png'
        },
        {
            id: 2,
            name: '妈祖石雕像',
            latitude: 25.090289,
            longitude: 119.148171,
            iconPath: '../../img/地图图标/妈祖石雕像.png',
            width: 70,
            height: 70,
            category: '打卡点',
            information: '妈祖石雕像坐落在妈祖文化园山顶的妈祖像，是由厦门大学美术学院的李维祀教授设计的，1989年奠基修建，经两年时间才落成。石像的高度为14.35米，象征湄洲岛的陆域面积。由365块花岗岩石组成，是湄洲岛上最高最大的一尊妈祖像。',
            src: 'cloud://cloud1-7g5vke1x7dd05544.636c-cloud1-7g5vke1x7dd05544-1325794133/地图图片/妈祖石像.jpg'
        },
        ],
        //妈祖庙群范围
        polygonPoints: [{
            latitude: 25.090478,
            longitude: 119.144597,
        }, {
            latitude: 25.090783,
            longitude: 119.145113,
        }, {
            latitude: 25.090668,
            longitude: 119.145191,
        }, {
            latitude: 25.090937,
            longitude: 119.146388,
        }, {
            latitude: 25.091135,
            longitude: 119.146331,
        }, {
            latitude: 25.092311,
            longitude: 119.147554,
        }, {
            latitude: 25.092371,
            longitude: 119.147921,
        }, {
            latitude: 25.092865,
            longitude: 119.148504,
        }, {
            latitude: 25.093495,
            longitude: 119.149567,
        }, {
            latitude: 25.093538,
            longitude: 119.150066,
        }, {
            latitude: 25.093308,
            longitude: 119.150075,
        }, {
            latitude: 25.092677,
            longitude: 119.15048,
        }, {
            latitude: 25.089423,
            longitude: 119.150498,
        }, {
            latitude: 25.08869,
            longitude: 119.149388,
        }, {
            latitude: 25.087097,
            longitude: 119.148137,
        }, {
            latitude: 25.087012,
            longitude: 119.147196,
        }, {
            latitude: 25.085725,
            longitude: 119.14619,
        }, {
            latitude: 25.085787,
            longitude: 119.145409,
        }, {
            latitude: 25.086139,
            longitude: 119.145561,
        }, {
            latitude: 25.086271,
            longitude: 119.145422,
        }, {
            latitude: 25.087846,
            longitude: 119.146212,
        }, {
            latitude: 25.08789,
            longitude: 119.146468,
        }, {
            latitude: 25.088562,
            longitude: 119.14685,
        }, {
            latitude: 25.089009,
            longitude: 119.146764,
        }, {
            latitude: 25.089629,
            longitude: 119.147091,
        }, {
            latitude: 25.089731,
            longitude: 119.146912,
        }, {
            latitude: 25.08957,
            longitude: 119.14643,
        }, {
            latitude: 25.089454,
            longitude: 119.146356,
        }, {
            latitude: 25.089084,
            longitude: 119.145563,
        }]
    },


    /**
     * 标记点显示
     */
    //地图标记点的显示切换
    showMarkers: function (category) {
        //检查markers数组中是否存在不以特定category开头的项
        let hasNonFood = this.data.markers.some(marker => !marker.category.startsWith(category));//存在不以特定category开头的项
        let hasFood = this.data.markers.some(marker => marker.category.startsWith(category));//不存在不以特定category开头的项
        if (this.data.markers.length !== 0 && hasFood) {
            this.setData({
                markers: []
            });
        } else if (this.data.markers.length == 0 || hasNonFood) {
            this.setData({
                markers: this.data.mks
            });
        }
    },
    //调用腾讯LBS的地点搜索功能并在该方法中调用showMarker方法
    POI: function (param, category) {
        // 调用接口
        var that = this;
        qqmapsdk.search({
            keyword: param,  // 搜索关键词
            rectangle: '25.020849,119.078657,25.104488,119.216173',
            success: function (res) { // 搜索成功后的回调
                var mks = []
                for (var i = 0; i < res.data.length; i++) {
                    mks.push({ // 获取返回结果，放到mks数组中
                        name: res.data[i].title,
                        id: Number(res.data[i].id),//回传的id类型为String，需要转换成Number
                        latitude: res.data[i].location.lat,
                        longitude: res.data[i].location.lng,
                        information: '地址：' + res.data[i].address + '。' + '联系电话：' + res.data[i].tel,
                        iconPath: "../../img/地图图标/POI.png", //图标路径
                        width: 30,
                        height: 30,
                        category: res.data[i].category,
                        src: ''
                    })
                }
                that.setData({ //设置mks属性，将搜索结果保存
                    mks: mks
                }, function () {
                    that.showMarkers(category);
                });
            },
            // fail: function (res) {
            //     console.log(res);
            // },
            // complete: function (res) {
            //     console.log(res);
            // }
        });
    },
    //按钮颜色的切换
    toggleImage_zs: function () {
        this.setData({
            isOnCLickPOI_zs: !this.data.isOnCLickPOI_zs,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    toggleImage_ys: function () {
        this.setData({
            isOnCLickPOI_ys: !this.data.isOnCLickPOI_ys,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    toggleImage_cs: function () {
        this.setData({
            isOnCLickPOI_cs: !this.data.isOnCLickPOI_cs,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    toggleImage_bld: function () {
        this.setData({
            isOnCLickPOI_bld: !this.data.isOnCLickPOI_bld,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    toggleImage_tcc: function () {
        this.setData({
            isOnCLickPOI_tcc: !this.data.isOnCLickPOI_tcc,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_ld: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    toggleImage_ld: function () {
        this.setData({
            isOnCLickPOI_ld: !this.data.isOnCLickPOI_ld,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            showClockBotton: false,
            showRadar: false,
        });
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //比例尺恢复默认
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    //按钮的点击，完成各个POI按钮的颜色和显示的切换
    zs: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_zs();
        this.POI(param, category);
    },
    ys: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_ys();
        this.POI(param, category);
    },
    cs: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_cs();
        this.POI(param, category);
    },
    bld: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_bld();
        this.POI(param, category);
    },
    tcc: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_tcc();
        this.POI(param, category);
    },
    ld: function (e) {
        var param = e.target.dataset.param
        var category = e.target.dataset.category
        this.toggleImage_ld();
        this.POI(param, category);
    },
    // 打卡点的显示
    clockPoint: function () {
        // 显示打卡点,改变地图比例尺
        this.setData({
            scale: 17,
            mks: this.data.clockPoint,
            // 打卡点颜色的切换
            isOnCLickPOI_clock: !this.data.isOnCLickPOI_clock,
            // 打卡按钮出现的切换
            showClockBotton: !this.data.showClockBotton,
            showRadar: false,
            // 其他标记按钮的显示颜色为默认
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_cs: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false
        }, function () {// 打卡点出现的切换
            this.showMarkers('打卡点')
        });
        // 改变地图中心经纬度，设置延时为300s
        setTimeout(() => {
            this.mapCtx.moveToLocation({
                latitude: 25.090542,
                longitude: 119.14667,
            })
        }, 300)
    },


    /**
     * 打卡功能
     */
    clock: function () {
        this.setData({
            showRadar: !this.data.showRadar
        });
        wx.getLocation({
            success: (res) => {
                // // 测试经纬度
                // var testLongitude = 119.14505;
                // var testLatitude = 25.090454;
                //找到位置最近的景点
                let distance = Number.MAX_VALUE;
                let nearest = [];
                this.data.markers.forEach((marker) => {
                    // 计算当前标记点与测试点的欧几里得距离
                    let d2 = Math.pow((res.longitude - marker.longitude), 2) + Math.pow((res.latitude - marker.latitude), 2);
                    d2 = Math.sqrt(d2);
                    if (d2 < distance) {
                        // 更新最短距离和最近的标记点
                        distance = d2;
                        nearest = marker;
                    }
                })
                // 投影转换方法
                const project = (lng, lat) => {
                    const R = 6378137;// 地球半径，单位为米
                    const d = Math.PI / 180;// 将度转换为弧度的系数
                    const sin = Math.sin(lat * d); // 计算纬度的正弦值
                    return [R * lng * d, R * Math.log((1 + sin) / (1 - sin)) / 2];// 返回投影后的坐标
                }
                // 计算最近距离，单位为m
                if (nearest) {
                    let [x1, y1] = project(res.longitude, res.latitude);
                    let [x2, y2] = project(nearest.longitude, nearest.latitude);// 最近标记点的投影坐标
                    distance = Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2);// 计算两点间的平方距离
                    distance = Math.sqrt(distance).toFixed(2);// 将平方距离开方并保留两位小数
                }
                this.setData({
                    nearest: nearest,
                    distance: distance
                });
                // console.log('dis：' + distance + 'm'); // 打印距离，单位为米
                // console.log('nea:' + JSON.stringify(nearest)); // 打印最近的标记点信息
            },

        })
        // 在妈祖信笺功能里解锁对应打卡点的主题
        if (this.data.distance <= 10) {
            // console.log('打卡成功');
            const app = getApp();
            app.globalData.clockPoint.forEach((e) => {
                // console.log(e)
                if (e.id == this.data.nearest.id) {
                    app.globalData.clockPoint[e.id].is_check = true;
                    // console.log(app.globalData.clockPoint)
                }
            })
        }
    },
    checkin: function () {

    },


    /**
     * 标记点弹窗功能
     */
    // 显示弹窗
    showDialog: function (e) {
        //查找打卡点的id，获取所选的打卡点对象
        // console.log(e.markerId)
        const marker = this.data.markers.find(item => item.id == e.markerId);
        marker && this.setData({
            currentMarker: marker,
            //显示弹窗
            showDialog: true
        });
    },
    // 关闭弹窗
    onClose: function () {
        //关闭弹窗
        this.setData({
            showDialog: false
        });
    },
    // 在弹窗中跳转外部导航功能 
    navigate: function () {
        const latitude = this.data.currentMarker.latitude
        const longitude = this.data.currentMarker.longitude
        let destination = this.data.currentMarker.name
        //需先在OnLoad()方法中，使用 wx.createMapContext 获取 map 上下文
        this.mapCtx.openMapApp({
            latitude: latitude,
            longitude: longitude,
            destination: destination,
        });
    },


    /**
     * 定位功能
     * 实现：
     * 1.判断用户定位是否在湄洲岛上
     * 2.地图初始化
     */
    // 判断用户定位是否在湄洲岛上
    getUserLocation: function () {
        // 获取用户位置
        wx.getLocation({
            success: (res) => {
                const userLatitude = res.latitude;
                const userLongitude = res.longitude;
                const latitude = 25.065820705267043;//纬度--测试在湄洲岛内
                const longituede = 119.12646561262648;//经度--测试在湄洲岛内
                // 判断用户是否在湄洲岛内
                if (this.isInMatsuIsland(userLatitude, userLongitude)) {
                    // 用户在湄洲岛内，显示位置信息
                    this.setData({
                        userLocation: '您在湄洲岛内',
                    });
                } else {
                    // 用户不在湄洲岛内，弹出提示框
                    wx.showToast({
                        title: '未在湄洲岛上',
                        icon: 'none',
                        duration: 2000,
                    });
                }
            },
            fail: () => {
                // 获取用户位置失败，处理错误
                wx.showToast({
                    title: '获取位置失败',
                    icon: 'none',
                    duration: 2000,
                });
            },
        });
    },
    isInMatsuIsland: function (latitude, longitude) {
        const matsuLatitudeMin = 25.022981526671686; // 湄洲岛纬度最小值
        const matsuLatitudeMax = 25.10969471968278; // 湄洲岛纬度最大值
        const matsuLongitudeMin = 119.08190600071578; // 湄洲岛经度最小值
        const matsuLongitudeMax = 119.16827196233822; // 湄洲岛经度最大值
        //判断用户位置是否在湄洲岛内
        return (
            latitude >= matsuLatitudeMin &&
            latitude <= matsuLatitudeMax &&
            longitude >= matsuLongitudeMin &&
            longitude <= matsuLongitudeMax
        );
    },
    // 地图初始化
    initialize: function () {
        //改变地图中心经纬度        
        this.mapCtx.moveToLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        })
        //标记点显示恢复默认
        this.setData({
            isOnCLickPOI_cs: false,
            isOnCLickPOI_clock: false,
            isOnCLickPOI_zs: false,
            isOnCLickPOI_ys: false,
            isOnCLickPOI_bld: false,
            isOnCLickPOI_tcc: false,
            isOnCLickPOI_ld: false
        })
        //标记点去除，恢复初始比例尺
        var that = this
        that.mapCtx.getScale({
            success: res => {
                that.setData({
                    scale: res.scale
                })
                wx.nextTick(() => {
                    that.setData({
                        scale: 13,
                        markers: [],
                        showClockBotton: false,
                        showRadar: false
                    })
                })
            }
        })
    },
    // 初始化按钮的点击
    locJudgement: function () {
        this.initialize();
        if (this.data.userLocation) {
            // 显示用户位置信息
            wx.showToast({
                title: this.data.userLocation,
                icon: 'none',
                duration: 2000,
            });
        } else {
            // 未获取用户位置，重新获取
            this.getUserLocation();
        }
    },


    /**
     * 明信片界面跳转功能
     */
    goToPostcard: function () {
        wx.navigateTo({
            url: '/pages/postcard/postcard',
        })
    },


    /**
     * 妈祖庙群区域显示功能
     */
    createPolygon: function () {
        this.setData({
            polygons: [{
                points: this.data.polygonPoints,
                strokeWidth: 2,
                strokeColor: '#f7f0e795',
                fillColor: '#f7f0e795',
            }]
        });
    },


    //页面生命周期：加载阶段
    onLoad: function () {
        // 获取用户位置
        this.getUserLocation();
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('map');
        const systemInfo = wx.getSystemInfoSync();
        // 绘制多边形
        this.createPolygon();
        // 状态栏高度 
        let statusBarHeight = systemInfo.statusBarHeight
        // 标题栏高度
        let titleHeight = 46
        this.setData({
            statusBarHeight: statusBarHeight,
            titleHeight: titleHeight
        });

    },
    //返回上一级页面
    back_page: function () {
        wx.navigateBack({
            delta: 1 // 返回的页面数，1表示返回上一层页面，依次类推
        })
    },
    click_QuanJing: function () {
        console.log("点击了湄洲全景")
        wx.navigateTo({
            url: '../out/QuanJing?src=' + encodeURIComponent("http://xmutsrsc.com/Panorama/index.html"),
        })
    }
});
