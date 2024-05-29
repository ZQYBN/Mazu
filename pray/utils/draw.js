function draw() {
  return new Promise((cg,sb)=>{
    const json = require('../data/signs')
    var i = getRandomInt(0,59);
    cg([json.signs[i].number,json.signs[i].content.签诗,json.signs[i].content.签诗典故]);
  })
  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
}
module.exports={
  draw
}
