import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View,Text,Button,Progress,Input,Image} from '@tarojs/components'
import Model from '../../Component/Model/model'

import './index.scss'


@connect(({ openModel,counter }) => ({
  openModel,counter

}))
class Index extends Component {
  constructor(){
    this.state={
      isOpened: false,
      name: '未登录',
      headUrl:''
    }
  }
  
  componentDidMount(){
    const userInfo=Taro.getStorageSync(
      "userInfo",
    )
    console.log(userInfo,this.props.counter)
    this.setState({
      name:userInfo.nickName,
      headUrl:userInfo.avatarUrl
    })
  }
  componentDidShow(){
    const userInfo=Taro.getStorageSync(
      "userInfo",
    )
    console.log(userInfo,this.props.counter) 
  }

  rememberWord(){
    Taro.navigateTo({
      url:'../remenber/index'
    })
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
          <Image className='userImg' src={headUrl}></Image>
          <View className='userName'>{this.state.name}</View>
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
        <Button onClick={this.rememberWord} className='startBtn'>{this.props.counter.RememberOnce==true?'继续背单词':'开始背单词吧'}</Button>
      </View>
    )
  }
}

export default Index
