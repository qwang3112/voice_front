// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "", //树洞内容
  },

 bindTextAreaBlur: function(e){
    this.data.detail = e.detail.value
  }, 

  send: function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //与服务器交互暂不写
    wx.request({
      url: getApp().globalData.server + '/voice/index.php/Home/Message/publish_new_message', 
      data: {
        user_id: getApp().globalData.user.user_id,
        username: getApp().globalData.user.username,
        // face_url: getApp().globalData.user.face_url,
        face_url: '/images/face.jpeg', //发布心声都用统一头像
        content: that.data.detail,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 后台要求
      },
      success (res) {
      if(res.data.error_code != 0){
          wx.showModal({
            title: '哎呀',
            content: '出错了呢! '+ res.data.msg,
            success: function (res) {
              if(res.confirm){
                console.log('用户点击确定')
              } else if(res.cancel){
                console.log('用户点击取消')
              }
            }
          })
        } else if(res.data.error_code == 0){
          wx.showModal({
            title: '恭喜',
            content: '发布成功',
            showCancel: false,
            success (res) {},
            complete: function(res){
              wx.reLaunch({
                url: '/pages/square/square'
              })
            }
          })            
        }
      },
      fail: function(res){
        wx.showModal({
          title: '哎呀',
          content: '网络不在状态呢! ',
          success: function (res) {
            if(res.confirm){
              console.log('用户点击确定')
            } else if(res.cancel){
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function(res){
        wx.hideLoading()
      }
    })

    setTimeout(function(){
      wx.hideLoading()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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