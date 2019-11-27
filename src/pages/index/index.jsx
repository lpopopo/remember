import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View,Text,Button,Progress,Input,Image} from '@tarojs/components'
import Model from '../../Component/Model/model'
import {startremember} from '../../actions/counter'

import './index.scss'


@connect(({ openModel,counter }) => ({
  openModel,counter
}), (dispatch) => ({
  startRemember(){
      dispatch(startremember())
  }
}))
class Index extends Component {
  constructor(){
    this.state={
      isOpened: false,
      name: '未登录',
      headUrl:'',
      word:null,
      bookname:'未选择',
      words:0,
      datetime:0,
      learned:0,
      total:0,
    }
  }
  config = {
    navigationBarTitleText: '背了么',
    navigationBarBackgroundColor: "#FFC42F",
  }
   
  //初始获取首页数据
    componentDidShow(){
      const userInfo=Taro.getStorageSync(
        "userInfo",
      )
      if(!userInfo){
        Taro.navigateTo({
          url:'../login/login'
        })
        this.setState({
          name:userInfo.nickName,
          headUrl:userInfo.avatarUrl,
        })
      }else{ 
        this.setState({
          name:userInfo.nickName,
          headUrl:userInfo.avatarUrl,
        })}
      const openid=Taro.getStorageSync("uid");
      const that=this;
      Taro.request({
        url: 'http://www.estationaeolus.xyz/vocabulary/getInfo', 
        data: {
          openid:openid,
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        //成功返回
        success: function (res) {
          if(res.statusCode==200){
            that.setState({
              bookname:res.data.planlist[0].bookname,
              words:res.data.planlist[0].words,
              learned:res.data.planlist[0].learned,
              datetime:res.data.planlist[0].datetime,
              total:res.data.planlist[0].total,
            })
          }
        },fail:function(){
          Taro.showToast({
            title: '网络异常',
            duration: 1000,
            icon:"none"
          })
        }
      })
    }
    //背单词函数
    rememberWord(){
      Taro.navigateTo({
        url:'../remenber/index'
      })
    }
    //搜索功能函数
    Change(e){
      this.setState({
        word: e.detail.value
      })
    }
    search(){
      if(this.state.word.trim()!==null){
        Taro.navigateTo({
          url:`../remenber/search/index?en=${this.state.word}`
        })
      }
    }
    //制定计划函数
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
      const that=this;
      const bookname=this.props.openModel.title;
      const words=this.props.openModel.value;
      const openid=Taro.getStorageSync("uid");
      Taro.request({
        url: 'http://www.estationaeolus.xyz/vocabulary/UpdateInfo', 
        data: {
          openid:openid,
          bookname:bookname,
          words:words
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        //成功返回
        success: function (res) {
          // console.log(res)
          if(res.statusCode==200){
            that.setState({
              bookname:res.data.planlist[0].bookname,
              words:res.data.planlist[0].words,
              learned:res.data.planlist[0].learned,
              datetime:res.data.planlist[0].datetime,
              total:res.data.planlist[0].total,
            })
          }
        },fail:function(){
          Taro.showToast({
            title: '网络异常',
            duration: 1000,
            icon:"none"
          })
        }
      })
    }
    //登录
    toLogin(){
      console.log(11)
      Taro.navigateTo({
        url:'../login/login'
      })
    }
  render () {
    const {learned,total,datetime,words,bookname}=this.state;
    const length = learned / total *100
    return (
      <View className='indexPage'>
        <Model isOpened={this.state.isOpened} onCancel={()=>this.onCancel()} onOk={()=>this.onOk()}/>

        <View className='user'>
          <Button className='userImgbtn' onClick={()=>this.toLogin()}><Image  className='userImg' src={headUrl} /></Button>
          <View className='userName'>{this.state.name}</View>
          <Input onChange={(e)=>this.Change(e)} className='wordSearch' type='text' placeholder='搜索单词' />
          <Button onClick={()=>this.search()} plain={true} className='wordSearchBtn'>搜索</Button>
        </View>

        <View className='planPage'>
          <View className='planWordDate'>
            <View className='planTitle'><Text>剩余</Text><Text>今日单词</Text></View>
            <View className='planData'><Text>{datetime}<Text className='smallWord'>天</Text></Text><Text>{words}<Text className='smallWord'>个</Text></Text></View>
          </View>
          <View className='planChoose'>
            <Text>{bookname==null?'未选择':bookname}</Text>
            <Button plain={true} onClick={()=>this.makePlan()} className='planBtn'>制定计划</Button>
          </View>
          <View className='planProcess'>
            <Text>已学完 {learned} / {total}</Text>
            <Progress
              className='Progress'
              strokeWidth={10}
              percent={length}
              activeColor={'#FFC42F'}
            />
          </View>
        </View>
        <Button onClick={()=>{this.rememberWord();this.props.startRemember()}} className='startBtn'>{this.props.counter.RememberOnce==true?'开始背新单词吧':'继续背单词'}</Button>
      </View>
    )
  }
}

export default Index
