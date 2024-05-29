function getUTCTime() {
  var currentDate = new Date();
  var utcTimestamp = Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate(),
      currentDate.getUTCHours(),
      currentDate.getUTCMinutes(),
      currentDate.getUTCSeconds()
  ) / 1000; // 将毫秒转换为秒
  return utcTimestamp;
}
module.exports={
  getUTCTime
}