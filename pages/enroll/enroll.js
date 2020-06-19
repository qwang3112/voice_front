// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phonenum:"",
    password:"",
    passwordack:""
  },

  usernameInput: function(e){
    this.data.username = e.detail.value
    // console.log(this.data.username)
  },

  phonenumInput: function(e){
    this.data.phonenum = e.detail.value
  },

  passwordInput: function(e){
    this.data.password = e.detail.value
  },

  passwordAckInput: function(e){
    this.data.passwordack = e.detail.value
  },

  signin: function(){
    wx.redirectTo({
      url: '/pages/login/login'
    })
  },

  register: function(e){
    var that = this
    var myreg = /^[1][3|4|5|6|7|8|9][0-9]{9}$/
    if (that.data.username == ""){
      wx.showModal({
        title: '提示',
        content: '请输入用户名',
        showCancel: false,
        success (res) {}
      })
    } else if (that.data.phonenum == ""){
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
        showCancel: false,
        success (res) {}
      })
    } else if (that.data.phonenum.length != 11){
      wx.showModal({
        title: '提示',
        content: '手机号长度有误',
        showCancel: false,
        success (res) {}
      })
    } else if (!(myreg.test(that.data.phonenum))){
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel: false,
        success (res) {}
      })
    } else if (that.data.password == ""){
      wx.showModal({
        title: '提示',
        content: '请输入密码',
        showCancel: false,
        success (res) {}
      })
    } else if (that.data.passwordack == ""){
      wx.showModal({
        title: '提示',
        content: '请输入确认密码',
        showCancel: false,
        success (res) {}
      })
    } else if (that.data.passwordack != that.data.password){
      wx.showModal({
        title: '提示',
        content: '两次输入的密码不一致',
        showCancel: false,
        success (res) {}
      })
    } else {
      wx.request({
        url: getApp().globalData.server + '/voice/index.php/Home/User/sign', 
        data: {
          username: that.data.username,
          phone: that.data.phonenum,
          password: that.data.password,
          password_again: that.data.passwordack,
          face_url: '/images/face.jpeg'
          // face_url: getApp().globalData.userInfo.avatarUrl
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 后台要求
        },
        success (res) {
          if(res.data.error_code == 1){
            wx.showModal({
              title: '提示',
              content: '参数不足',
              showCancel: false,
              success (res) {}
            })
          } else if(res.data.error_code == 2){
            wx.showModal({
              title: '提示',
              content: '两次输入的密码不一致',
              showCancel: false,
              success (res) {}
            })
          } else if(res.data.error_code == 3){
            wx.showModal({
              title: '提示',
              content: '手机号已被注册！',
              showCancel: false,
              success (res) {}
            })
          } else if(res.data.error_code != 0){
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
            getApp().globalData.user = res.data.data,
            wx.showModal({
              title: '恭喜',
              content: '注册成功',
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
        }
      })
    } 
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