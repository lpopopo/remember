//背单词的组件
import Taro , {Component}  from "@tarojs/taro" 
import {View} from '@tarojs/components'
import './rem.scss'

import { connect } from '@tarojs/redux'
@connect(({ counter }) => ({
    counter
  }), (dispatch) => ({
  }))


class Remember extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidShow(){
    }
    componentDidHide(){
    }
    render() {
        return (
            <View className="remember-con">
                {/* 首先是一个定时器 */}
        <View className="timer"><View>{this.props.counter.down}</View></View>
                {/* 单词的英文即中文展示 */}
                <View className="word-con">
                    <View className="word">
                        <View className="English">
                            {this.props.counter.word[this.props.counter.index].en}
                        </View>
                        <View className="Chinese">
                        {this.props.counter.word[this.props.counter.index].zh}
                            </View>
                    </View>
                </View>
            </View>
        );
    }
}
 
export default Remember;