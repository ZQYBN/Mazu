function img_base64(url) {
  // 返回一个新的Promise
  //使用Promise来处理异步操作
  // Promise对象有三种状态：
  // pending（进行中）：初始状态，既不是成功，也不是失败。
  // fulfilled（已成功）：意味着操作成功完成。
  // rejected（已失败）：意味着操作失败。
  // resolve：当你的异步操作成功时，你会调用这个函数。它将Promise的状态从"pending"改为"fulfilled"，并且将异步操作的结果作为参数传递出去。
  // reject：如果异步操作失败，你会调用这个函数。它将Promise的状态从"pending"改为"rejected"，并且将错误信息作为参数传递出去。
  return new Promise((resolve, reject) => {
    if(url==null||url==''){
      // 获取图片本地路径
      wx.chooseMedia({
        count: 9,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success: function (res) {
          // 获取图片本地路径
          var tempFilePaths = res.tempFiles[0].tempFilePath; 
          console.log('本地路径'+tempFilePaths)
          // 读取图片文件
          const filePath = tempFilePaths;
          const fileManager = wx.getFileSystemManager();
          fileManager.readFile({
            filePath: filePath,
            encoding: 'base64',
            success: function (res) {
              // 图片转换成base64格式
              var base64Data = res.data;
              // 使用resolve返回base64Data
              resolve(base64Data);
            },
            fail: function (res) {
              // 使用reject返回错误信息
              console.log(res.errMsg);
              reject(res.errMsg);
            }
          });
        },
        fail: function (res) {
          // 用户取消选择图片时触发错误
          console.log('用户取消选择');
          reject(res);
      }
      });
    }else{
      // 读取图片文件
      const filePath = url;
      const fileManager = wx.getFileSystemManager();
      fileManager.readFile({
        filePath: filePath,
        encoding: 'base64',
        success: function (res) {
          // 图片转换成base64格式
          var base64Data = res.data;
          // 使用resolve返回base64Data
          resolve(base64Data);
          },
        fail: function (res) {
          // 使用reject返回错误信息
          console.log(res.errMsg);
          reject(res.errMsg);
        }
      });
    }
  });
}
module.exports = {
  img_base64
};
