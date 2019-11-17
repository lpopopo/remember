import Taro, { Component } from '@tarojs/taro'
import { View,Button} from '@tarojs/components'

import './login.scss'

class Login extends Component {
    config = {
    navigationBarTitleText: '登录',
    navigationBarBackgroundColor: "#FFC42F",
  }

  Login () {
    Taro.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(userInfo)
      }
    })
  }
  render () {
    return (
      <View>
          <Button  open-type="getUserInfo"  lang="zh_CN" onGetUserInfo={()=>this.Login()} className='loginBtn'>登录</Button>
      </View>
    )
  }
}

export default Login
