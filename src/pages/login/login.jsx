import Taro, { Component } from '@tarojs/taro'
import { View,Button} from '@tarojs/components'
import './login.scss'

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
              <Button className='loginbtn' onGetUserInfo={()=>this.toBegin()} open-type='getUserInfo'>登录授权</Button>  
            </View>
        )
    }
}
