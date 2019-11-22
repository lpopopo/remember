import  Taro ,{Component} from "@tarojs/taro"
import {View , Button} from  "@tarojs/components"

import './done.scss'

import { connect } from '@tarojs/redux'
import { rememberInit} from '../../actions/counter'

@connect(({ counter }) => ({
    counter
  }), (dispatch) => ({
      rememberInit(){
          dispatch(rememberInit())
      }
  }))

class Done extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount(){
        //发送请求给后端进行相应的背诵记录
        //相当于还有完成自己设定的任务才算完成任务,初始化index,一遍重新重新请求
        //请求完成之后，自动跳转回首页
        if(this.props.type === 'remember'){
            this.props.rememberInit()
            console.log(1)
        }
    }
    componentDidShow(){
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