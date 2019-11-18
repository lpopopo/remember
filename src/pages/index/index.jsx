import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View,Text,Button,Progress,Input} from '@tarojs/components'
import Model from '../../Component/Model/model'

import './index.scss'


@connect(({ openModel }) => ({
  openModel
}))
class Index extends Component {
  constructor(){
    this.state={
      isOpened: false
    }
  }
  componentDidMount(){
    console.log(this.props)
  }
  toLogin(){
    Taro.navigateTo({
      url: '/pages/login/login',
    })    
  }
  rememberWord(){
    console.log('跳转到单词记忆组件')
  }
  makePlan(){
    this.setState({
      isOpened: true
    })
  }
  onCancel(){
    this.setState({
      isOpened: false
    })
  }
  onOk(){
    this.setState({
      isOpened: false
    })
  }
    config = {
    navigationBarTitleText: '背了么',
    navigationBarBackgroundColor: "#FFC42F",
  }
  render () {
    const {value,title}=this.props.openModel;
    return (
      <View className='indexPage'>
        <Model isOpened={this.state.isOpened} onCancel={()=>this.onCancel()} onOk={()=>this.onOk()}/>
        <View className='user'>
          <View onClick={()=>this.toLogin()} className='userImg'></View>
          <View className='userName'>刘帅</View>
          <Input className='wordSearch' type='text' placeholder='搜索单词' />
          <Button plain={true} className='wordSearchBtn'>搜索</Button>
        </View>
        <View className='planPage'>
          <View className='planWordDate'>
            <View className='planTitle'><Text>剩余</Text><Text>今日单词</Text></View>
            <View className='planData'><Text>0<Text className='smallWord'>天</Text></Text><Text>{value}<Text className='smallWord'>个</Text></Text></View>
          </View>
          <View className='planChoose'>
            <Text>{title}</Text>
            <Button plain={true} onClick={()=>this.makePlan()} className='planBtn'>制定计划</Button>
          </View>
          <View className='planProcess'>
            <Text>已学完 20 / 3071</Text>
            <Progress
              className='Progress'
              strokeWidth={10}
              percent={60}
              activeColor={'#FFC42F'}
            />
          </View>
        </View>
        <Button onClick={()=>this.rememberWord()} className='startBtn'>开始背单词吧</Button>
      </View>
    )
  }
}

export default Index
