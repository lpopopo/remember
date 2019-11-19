//检测sessionkey
Taro.checkSession({
    success: function() {
      //console.log("session_key 未过期")
      //session_key 未过期，并且在本生命周期一直有效
    },
    fail: function() {
      // session_key 已经失效，需要重新执行登录流程
      // 登录
      this.gotologin()
    }
  })

  gotologin = () => {
    var that = this
    //清除缓存
    Taro.clearStorageSync()
    // 登录
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: that.globalData.path + '/miniLogin/login.ajax',
            data: {
              code: res.code
            },
            success: res => {
              let mylogininfo = res.data.data
              if (mylogininfo != null) {
                Taro.setStorageSync('logininfo', mylogininfo)
                console.log(mylogininfo)
                //登录验证  拿openid换AUTH_TICKET
                Taro.request({
                  method: 'post',
                  url:
                    that.globalData.path +
                    '/miniLogin/loginCheck.ajax',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    openid: mylogininfo.openid,
                    unionid: mylogininfo.unionid ? mylogininfo.unionid : '',
                    phoneNo: ''
                  },
                  success: res => {
                    let mdata = res.data
                    if (mdata.code == 200) {
                      Taro.showToast({
                        title: '登录成功',
                        icon: 'success',
                        duration: 2000
                      })
                      // 存储AUTH_TICKET
                      Taro.setStorageSync(
                        'AUTH_TICKET',
                        mdata.data.AUTH_TICKET
                      )
                      // 携带AUTH_TICKET请求接口，获取数据
                      Taro.request({
                        method: 'post',
                        url:
                          that.globalData.path + '/comLogin/statffCompany.ajax',
                        header: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'weixinauth': mdata.data.AUTH_TICKET
                        },
                        success: function(res) {
                          console.log(res)
                        }
                      })

                    } else if (mdata.code == 400) {
                      //此ID未绑定
                      //获取手机号码绑定
                    }
                  }
                })
              } else {
                console.log(res.data)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }