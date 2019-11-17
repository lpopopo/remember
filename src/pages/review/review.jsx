import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

class Review extends Component {
    config = {
    navigationBarTitleText: '复习',
    navigationBarBackgroundColor: "#FFC42F",
  }
  render () {
    return (
      <View >
        复习页
      </View>
    )
  }
}

export default Review
