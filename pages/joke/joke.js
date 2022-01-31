// pages/joke/joke.js

var utilJoke = require("../../utils/util_joke.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, // 当前选中的导航的索引号
    tabItemsArray: [ //顶部导航条数组
      {type:"video", name:"视频"},
      {type:"image", name:"图片"},
      {type:"text", name:"文本"}
    ],
    videoJokeArray: [],  // 视频笑话数组
    imageJokeArray: [], // 图片笑话数组
    textJokeArray: [],  // 文本笑话数组
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeJokes(this.data.tabItemsArray[this.data.currentTab].type)
  },

changeJokes: function(typeName) {
  let that = this
  utilJoke.getJokeList(typeName, this.data.page, function(res){
    console.log(res);
    for(let i in res.items){
      if(res.items[i].pic_size[0] > res.items[i].pic_size[1]){
        res.items[i].width =710;
        res.items[i].height = res.items[i].pic_size[1] / res.items[i].pic_size[0]*710;
      } else {
        res.items[i].height = 710;
        res.items[i].width = res.items[i].pic_size[0] / res.items[i].pic_size[1]*710
      }
    }
    that.setData({
      videoJokeArray:res.items
    });
    console.log(that.data.videoJokeArray);
  })
},

swichNav: function (e) {
  if (this.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    //当切换分类，修改当前类别，重新为开始的编号为0，并清空图片数组数据
    this.setData({
      currentTab: e.target.dataset.current,
      videoJokeArray: [],  // 视频笑话数组
      imageJokeArray: [], // 图片笑话数组
      textJokeArray: [],  // 文本笑话数组
      page: 0,
    })
    //当切换分类时调用changeJokes读取数据
    this.changeJokes(this.data.tabItemsArray[this.data.currentTab].type);
  }
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