// pages/profile/profile.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderList: [
      { icon: 'message.png', info: '我的消息' },
      { icon: 'pointer.png', info: '积分商城' },
      { icon: 'vip.png', info: '会员卡' },
    ],
    serviceList: [
      { icon: 'cart.png', info: '我的购物车' },
      { icon: 'app.png', info: '下载购物APP' },
    ]
  },
  onGotUserInfo: function (e) {//授权登陆
    const { userInfo } = e.detail
    console.log(e)
    this.setData({
      userInfo: userInfo
    })
  },
  onLoad: function (options) {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
          
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})