// pages/index/picDetail/picDetail.js
Page({
/**
   * 页面的初始数据
   */
  data: {
    imageArray: [], //图片数组
    pageHeight:0,  //页面高度
    thumbUrl: "",   //图片缩略图路径
    picUrl: "",   //图片大图路径
    index: 0,  //当前图片的序号
    error:false, //是否加载图片出错
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    var pages=getCurrentPages();
    var prevPage=pages[pages.length - 2 ];  //上一级页面
    var imageObj = prevPage.data.imageArray[index];
   
    console.log(imageObj);
    var width = wx.getSystemInfoSync().windowWidth * 0.96;
    var height = width* (imageObj.height/imageObj.width);
    this.setData({
      index: index,
      pageHeight:height,
      thumbUrl: imageObj.thumbUrl,
      picUrl: imageObj.picUrl,
      imageArray: prevPage.data.imageArray
    })
  },

  //当图像加载出错
  imageOnloadError(e) {
    console.log(e);
    this.setData({
      error: true
    })
  },
  
  //当图片切换为下一张
  imageChange(){
    this.setData({
      error: false
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})