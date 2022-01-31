/*根据类别获取图片工具*/

function getJokeList(type, page,  callback) {

  var jokeApi;
  jokeApi = "https://m2.qiushibaike.com/article/list/"+type + "?type=refresh" + "&page=" + page ;

  //发送请求加载信息
  wx.request({
    url: jokeApi,
    success: function (res) {
      var hw = res.data;
      callback && callback(hw);
    }
  })
}

function getCommentsById(jockid, count, page, callback){
  // 使用ES6 的模板字符串``tab上面的健
  let commentApi = `http://m2.qiushibaike.com/article/${jockid}/comments?count=${count}&page=${page}`
  //发送请求加载信息
  wx.request({
    url: commentApi,
    success: function (res) {
      var hw = res.data;
      callback && callback(hw);
    }
  })
  let index;
  for(index in products) {
    if(products[index].id == id) {
      return products[index]
    }
  }
  return null;
}

//设置导出信息
module.exports = {
  getJokeList:getJokeList, // 根据类型type 和页数page读取笑话列表
  getCommentsById:getCommentsById // 根据笑话id读取多条评论
};

