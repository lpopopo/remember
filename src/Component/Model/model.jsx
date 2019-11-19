import { AtTabs , AtModal, AtModalHeader, AtModalContent, AtModalAction,AtInputNumber  } from "taro-ui"
import { View} from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import './model.scss'
import { makeSure } from '../../actions/modelAction'

@connect(({  }) => ({
  
}), (dispatch) => ({
  makeSure (value,navTitle) {
    dispatch(makeSure(value,navTitle))
  }
}))

class Model extends Component {
  constructor(props){
    super(props)
      this.state={
          value: 30,
          current: 0,
          tabList:[{ title: '英语四级' }, { title: '英语六级' }, { title: '考研词汇' }],
          navTitle:'英语四级'
      }
  }
  
  // componentDidMount(){
  //   console.log(this.props,this.state.tabList[this.state.current].title)
  // }
  onCancel(){
    this.props.onCancel()
  }
  onOk(){
    this.props.onOk()
  }
  handleChange (value) {
    this.setState({
      value
    })
  }
  handleClick (value) {
    this.setState({
      current: value,
      navTitle: this.state.tabList[value].title
    });
  }
render () {
    const {value,tabList,navTitle}=this.state
    return (
      <View>
          <AtModal isOpened={this.props.isOpened} >
            <AtModalHeader>制定学习计划</AtModalHeader>
            <AtModalContent>
                <View className='modeTitile'>设置计划后所有进度将重新开始哦！</View>
                <View className='modeTitile1'>选择书本</View>
                <View > 
                  <AtTabs 
                    current={this.state.current} 
                    tabList={tabList} 
                    onClick={this.handleClick.bind(this)}
                  />
                </View>
                <View className='modeTitile1'>学习计划</View>
                  每天背
                  <AtInputNumber
                      min={0}
                      max={60}
                      step={1}
                      value={this.state.value}
                      onChange={this.handleChange.bind(this)}
                  />个
            </AtModalContent>
            <AtModalAction> 
              <Button onClick={()=>this.onCancel()}>取消</Button> 
              <Button onClick={()=>{this.props.makeSure(value,navTitle);this.onOk()}}  >确定</Button> 
            </AtModalAction>
         </AtModal>
      </View>
    )
  }
}

export default Model
