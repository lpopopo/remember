// 单词复习的组件
import  {Component}  from '@tarojs/taro' 

import {View , Text } from '@tarojs/components' 

import './rev.scss'
import { AtButton } from 'taro-ui';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View className="review-con">
                <View className='review'>
                    {/* 单词的英文 */}
                    <View className="question">
                        hello
                    </View>
                    {/* 单词的选项 */}
                    <View className='choose'>
                        <AtButton type="secondary" >
                            你好
                    </AtButton>
                    </View>
                    <View className='choose'>
                        <AtButton type="secondary" >
                            你好
                    </AtButton>
                    </View>

                </View>
            </View>
        );
    }
}
 
export default Review;