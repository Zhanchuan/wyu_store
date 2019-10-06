//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(res)
            }
          })
        }
      }
    })
  },
  addToCart(obj) {
    // 判断当前商品是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      //将商品加入
      this.globalData.cartList.push(obj)

    }
    // 购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  subToCart(obj){
    const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
    if(oldInfo.count>1){
      oldInfo.count -= 1;
    }
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  buyCurrentgood(obj){
    this.globalData.good=obj;
  },
  globalData: {
    cartList: [],
    userInfo: null
  }
})