//引入工具类
var utilImage = require("../../utils/util_image.js");


const app = getApp();
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageArray: [],
    currentTab: 0,   //当前选中的导航条的索引号
    tabItemsArray: ["动漫", "美女", "风景", "唯美", "动物", "植物", "明星", "古风", "卡通", "星空",  "游戏", "海底", "创意", "海边", "军事"],
    start: 0,  //从服务器加载时开始图片的索引号
    
    leftImages: [], // 左边已经展示的图片
    rightImages: [], // 右边已经展示的图片
    leftHeight: 0, //左边高度，非真实高度，不是用与数据绑定，用与和右边逻辑比较哪边高
    rightHeight: 0,//右边高度，非真实高度，不是用与数据绑定，用与和左边逻辑比较哪边高
    index: 0, // 已经加载图片的索引
  },

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.changeImages("动漫");
  },
  checkIscollect: function(url) {
    // 根据url检查
    if(app.globalData.myImageArray.indexOf(url) < 0) {
      return false;
    }
    return true;
  },
  collectImage: function(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      ['imageArray.[' + index + '].isCollect'] : !this.data.imageArray[index].isCollect
    })

    if(!this.checkIscollect(e.currentTarget.dataset.imageUrl)) {
      app.globalData.myImageArray.push(e.currentTarget.dataset.imageUrl);
    }else{
      var delIndex = app.globalData.myImageArray.indexOf(e.currentTarget.dataset.imageUrl);
      if(delIndex > -1) {
        app.globalData.myImageArray.splice(delIndex, 1);
      }
    }
    wx.setStorage({
      data: app.globalData.myImageArray,
      key: 'myImageArray',
    })
    console.log(app.globalData.myImageArray);
  },

  changeImages: function (typeName) {
    var that = this;
    var curImageArray = this.data.imageArray; //当保存当前的图像数组
    //然后调用工具里的方法加载新的图像数组
    utilImage.getImageListData(typeName, this.data.start, 50, function (res) {
//  遍历新的数组并在图像数组all_items中的对象添加是否已经收藏属性
for (let index in res.data.items) {
 res.data.items[index].isCollect = that.checkIscollect(res.data.items[index].thumbUrl);
}

      //定义一个allImageArray把上次的图像数组和新加载并添加收藏属性的数组合并
      var allImageArray = curImageArray.concat(res.data.items);
      //重新设置imageArray图像数组
      that.setData({
        imageArray: allImageArray
      });
      // console.log(that.data.imageArray);
      var length = res.data.items.length
      for (var i = 0; i < length; i++) {
        that.loadImage()
      }
    });
  },


  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      //当切换分类，修改当前类别，重新为开始的编号为0，并清空图片数组数据
      this.setData({
        currentTab: e.target.dataset.current,
        start: 0,
        imageArray: [],
        index: 0,
        leftHeight: 0,
        rightHeight: 0,
        leftImages: [],
        rightImages: [],
      })
      //当切换分类时调用changeImages读取数据
      this.changeImages(this.data.tabItemsArray[this.data.currentTab]);
    }
  },

  // 加载图像（可根据容器中图片的实时高度（模拟）进行图片的添加）
  loadImage: function () {
    var leftHeight = this.data.leftHeight; // 左容器高度局部变量
    var rightHeight = this.data.rightHeight; // 右容器高度局部变量
    var index = this.data.index; // 加载图片的索引
    var images = this.data.imageArray; // 总共要加载的图片
    //长宽比进行计算，虽然不是容器的实时高度，但是左右容器高度的大小关系是可以计算出来的
    //关键不是得到真实的左右高度，而是获得左边和右边哪边小，然后把新图片放到小的那边
    var widthFix = 360; // 左（右）容器中图片的固定宽度，可随意正值，原因如上
    var min = Math.min(leftHeight, rightHeight); // 计算左右容器高度的最小值
    var leftImages=this.data.leftImages;  // 左容器图片数组局部变量
    var rightImages=this.data.rightImages;// 右容器图片数组局部变量
    // 添加要新加载的图
    if (min == leftHeight) {
      leftImages.push(images[index]); //将当前图像加载到左边容器中
      // 计算当前容器内图片的高度
      var currHeight = (widthFix * images[index].height) / images[index].width;
      leftHeight += currHeight;  // 获取图片高度
    } else {
      rightImages.push(images[index]); //将当前图像加载到右边容器中
      // 按照长宽比计算的容器中图片应该的高
      var currHeight = (widthFix * images[index].height) / images[index].width;
      rightHeight += currHeight; // 获取图片高度
    }
    index++;     // 索引加1
    this.setData({
      index: index,
      leftHeight: leftHeight,
      rightHeight: rightHeight,
      leftImages:leftImages,
      rightImages:rightImages
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面到底了");
    //调用刷新时将执行的方法
    this.setData({
      start: this.data.start + 50
    })
    wx.showToast({
      title: '操作成功', /* 必填*/
      icon: 'none', //可选 "success", "loading", "none"，对应于不同图标 
      image: '/images/loading.gif', // 自定义图标（优先级高于icon）传其本地路径 
      duration: 2000, // 持续时间（ms） 
      mask: true, // 是否显示透明蒙层 
    })
    //当页面到底时再次调用changeImages读取新的数据实现动态刷新
    this.changeImages(this.data.tabItemsArray[this.data.currentTab]);
  },

  //当点某一张缩略图时跳转到详情页显示大图
  showBigImage:function(e){
    var index = e.target.dataset.index; //index为从页面data-index传过来的数据
    wx.navigateTo({
      url: '/pages/index/picDetail/picDetail?index='+index,
    })
  },
  

})