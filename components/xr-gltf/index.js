Component({
  // 组件的属性列表
  properties: {
      // ...
  },
  // 组件的初始数据
  data: {
      // ...
  },
  // 组件的方法列表
  methods: {
    jx:function({detail}){
      console.log('模型加载中', detail.value);
    },
    cg: function ({detail}) {
      console.log('模型加载已经完成', detail.value);
    },
    xjjx:function({detail}){
      console.log('背景加载中', detail.value);
    },
    cjcg: function ({detail}) {
      console.log('背景加载已经完成', detail.value);
    },
  }
})