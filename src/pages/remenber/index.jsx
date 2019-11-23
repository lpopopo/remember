import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtButton} from 'taro-ui'
import { connect } from '@tarojs/redux'

import { cutDown , indexAddOfRemember } from '../../actions/counter'

//中间的背单词组件
import Remember from '../../Component/remember/rem'
//背单词完成提醒组件
import Done from '../../Component/done/done'

import './index.scss'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add(){
    dispatch(indexAddOfRemember())
  },
  cut() {
    dispatch(cutDown())
  }
}))

class Index extends Component {
  constructor(props) {
    super(props);
}
    config = {
    navigationBarTitleText: '背单词'
  }


  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () {
  }

  componentDidMount(){
    console.log(this.props)
  }

  componentDidShow () {
    this.timer = setInterval(()=>{
      this.props.cut()
      if(this.props.counter.index > this.props.counter.finall - 1){
        clearInterval(this.timer)
      }
    } , 1000) 
   }

  componentDidHide (){
    clearInterval(this.timer)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  toPage(word){
    Taro.navigateTo({
		  url: `./search/index?en=${word}`
		})
  }
  render() {
    if(this.props.counter.index <= this.props.counter.finall - 1){
      return (
        <View className='index'>
                <View className="header-nav " >
                  {this.props.counter.index > 0 ? (<View className="text"><AtButton onClick={this.toPage.bind(this ,  this.props.counter.word[this.props.counter.index-1].en)}><View className="left"></View></AtButton></View>)  : <View></View> }
                  {this.props.counter.index <= this.props.counter.finall -2  ? (<View className="next"><AtButton onClick={this.props.add}><View className="right"></View></AtButton></View>) : null } 
                </View>
                <Remember></Remember>
                <View className="wrapper">
                  < AtButton className="detail-btn" onClick={this.toPage.bind(this ,  this.props.counter.word[this.props.counter.index].en)}>单词详情</ AtButton>
              </View>
        </View>
      )
    }
    return(
       <Done type="remember"></Done>
    )                                                                                                                                      
  }
}

export default Index
