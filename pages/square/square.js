// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstcolor: "#000000",
    secondcolor: "#979797",
    showdata: {}, 
    comments: {},
    detail: "", //评论内容
  },

  bindTextAreaBlur: function(e){
    this.data.detail = e.detail.value
  }, 

  comment: function(e){
    var that = this
    var showdata = that.data.showdata
     
    for(var i=0; i < showdata.length; i++){
      if(showdata[i].id == e.target.id){
        showdata[i].iscomment = 1
        that.setData({
          showdata: showdata
        })
        
        if(!that.comments){
          showdata[i].iscomment = 0
        } 
        //与服务器交互
        //与服务器交互,获取该条心声所有的评论
        wx.request({
            url: getApp().globalData.server + '/voice/index.php/Home/Comments/get_one_message_all_comments',     
            data: {
              message_id: e.target.id,
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 后台要求
            },
            success (res) {
            if(res.data.error_code != 0){
              that.setData({
                comments: null
              })
            } else if(res.data.error_code == 0){
                that.setData({
                  comments: res.data.data
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
        
        }
        })
      } 
    }
     
  },

  sendcomment: function(e){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    //与服务器交互暂不写
    wx.request({
      url: getApp().globalData.server + '/voice/index.php/Home/Comments/add_comments', 
      data: {
        username: getApp().globalData.user.username,
        message_id: e.target.id,
        comment: that.data.detail,
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
            content: '评论成功',
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

  like: function(e){
    var that = this
    var showdata = that.data.showdata
    for(var i=0; i < showdata.length; i++){
      if(showdata[i].id == e.target.id){
        if(showdata[i].islike == 1){
          wx.showModal({
            title: '提示',
            content: '您已经点过赞，不能更赞啦',
            showCancel: false,
            success (res) {},
          }) 
        } else {
          showdata[i].total_like++
          showdata[i].islike = 1
          that.setData({
            showdata: showdata
          })
          //与服务器交互
          wx.request({
            url: getApp().globalData.server + '/voice/index.php/Home/Message/do_like', 
            data: {
              message_id: e.target.id,
              user_id: getApp().globalData.user.user_id
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
                  title: '提示',
                  content: '点赞成功',
                  showCancel: false,
                  success (res) {},
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
              
            }
          })
        }
      }
    }
     
  },

  gotosquare: function(){

  },

  addtreehole: function(){
    wx.navigateTo({
      url: '../commit/commit',
    })
  },

  gotomine: function(){
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    }),
   
    //与服务器交互
    wx.request({
      url: getApp().globalData.server + '/voice/index.php/Home/Message/get_all_messages', 
      data: {},
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
          that.setData({
            showdata: res.data.data
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