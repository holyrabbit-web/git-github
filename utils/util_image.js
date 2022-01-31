/*根据类别获取图片工具*/

function getImageListData(typeName, start, len, callback) {

  var weApi;
  weApi = "https://pic.sogou.com/napi/pc/searchList?mode=1" + "&start=" + start + "&xml_len=" + len + "&query=手机壁纸高清"+typeName;

  //发送请求加载信息
  wx.request({
    url: weApi,
    success: function (res) {
      var hw = res.data;
      callback && callback(hw);
    }
  })
}


//设置导出信息
module.exports = {
  getImageListData:getImageListData
};

