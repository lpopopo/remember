import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View,Button} from '@tarojs/components'

import './reviewrap.scss'


@connect(({  }) => ({
  
}))
class Index extends Component {

    config = {
    navigationBarTitleText: '复习页',
    navigationBarBackgroundColor: "#FFC42F",
  }

  
  toReview(){
    Taro.navigateTo({
        url:'../review/index',
      })
  }
  toGlossary(){
    Taro.navigateTo({
      url: '../glossary/glossary'
    })
  }
  render () {
    return (
        <View>
            <View className='reviewrap'>
                <Button onClick={()=>this.toGlossary()}>单词本</Button>
                <Button onClick={()=>this.toReview()}>单词自检</Button>
            </View>
            <View className='reviewText'>更多功能，敬请期待！</View>
        </View>
    )
  }
}

export default Index
