import  Taro ,{Component} from "@tarojs/taro"
import {View , Button} from  "@tarojs/components"

import './done.scss'

class Done extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidShow(){
        //发送请求给后端进行相应的背诵记录
        //相当于还有完成自己设定的任务才算完成任务
        //请求完成之后，自动跳转回首页
        
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