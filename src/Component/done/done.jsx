import  Taro ,{Component} from "@tarojs/taro"
import {View , Button} from  "@tarojs/components"

import './done.scss'

import { connect } from '@tarojs/redux'
import { rememberInit , indexInit , rememberFishUpdate} from '../../actions/counter'

@connect(({ counter }) => ({
    counter
  }), (dispatch) => ({
      indexDoneInit(){
          dispatch(indexInit())
      },
      rememberUpdate(){
          dispatch(rememberFishUpdate())
      }
  }))

class Done extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){
        //发送请求给后端进行相应的背诵记录
        //相当于还有完成自己设定的任务才算完成任务,初始化index,一遍重新重新请求
        //请求完成之后，自动跳转回首页
        if(this.props.type === 'remember'){
            const openid=Taro.getStorageSync("uid");
            Taro.request({
                url: 'http://www.estationaeolus.xyz/vocabulary/finish', 
                data: {
                  openid:openid,
                },
                method: "GET",
                header: {
                  'content-type': 'application/json' // 默认值
                },
                //成功返回
                success: function (res) {
                  // console.log(res)
                  if(res.statusCode==200){
                  }
                },fail:function(){
                  Taro.showToast({
                    title: '网络异常',
                    duration: 1000,
                    icon:"none"
                  })
                }
              })
              this.props.rememberUpdate()
        }
    }
    componentDidShow(){
        if(this.props.type === 'remember'){
            this.props.indexDoneInit()
        }
    }
    componentDidHide(){
    }


    render() {
        return ( 
            <View className="done">
                <View className="smile"></View>
                <View>太棒了</View>
                <View>继续加油哟</View>
            </View>
         );
    }
}
 
export default Done;