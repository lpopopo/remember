import Taro, { Component } from '@tarojs/taro'
import { View,Button} from '@tarojs/components'

export default class Login extends Component {
    toBegin(){
        Taro.getUserInfo({
            success:function(res){
                var userInfo=res.userInfo
                Taro.setStorageSync(
                    "userInfo",
                    userInfo
                )
                Taro.navigateBack({
                    url:'pages/index/index'
                })
                }
            })
        }
        config = {
            navigationBarTitleText: '登录',
            navigationBarBackgroundColor: "#FFC42F",
          }
    render() {
        return (
            <View>
              <Button onGetUserInfo={()=>this.toBegin()} open-type='getUserInfo'>登录授权</Button>  
            </View>
        )
    }
}
