import Taro , {Component} from '@tarojs/taro'
import {View , Text} from '@tarojs/components'
import Axios from 'taro-axios'

import {AtButton} from 'taro-ui'

import './index.scss'

import Done from '../../Component/done/done'

import { connect } from '@tarojs/redux'

import {indexAddOfReview , errTouch , getWord} from '../../actions/review'

@connect(({ reviewer }) => ({
    reviewer
  }), (dispatch) => ({
      index(){
          dispatch(indexAddOfReview())
      },
      err(){
          dispatch(errTouch())
      },
      getreWord(){
          dispatch(getWord())
      }
  }))

class Review extends Component {
    constructor(props) {
        super(props);
    }
    config={
        navigationBarTitleText: '复习单词',
        navigationBarBackgroundColor: "#FFC42F",        
    }
    componentWillMount(){
        this.props.getreWord()
        //请求复习单词的数据
        // const action = getWord()
        // store.dispatch(action)
    }
    componentDidMount(){
        console.log(this.props)
    }
    // 当按钮的点击事件点击正确时，切换进行下一个单词的复习
    // 并进行判断state，是否将该单次加入错误队列中
    // 最后对state值进行重置

    // 点击事件处理
    clickToAnswer(index , option){
        if(option === index){
            this.props.index()
        }else{
            this.props.err()
        }
    }
    render() { 
        const {index} = this.props.reviewer
        const {data} = this.props.reviewer
        const soure = data[index]
        const  word = soure.options
        const length = data.length
        const answer = soure.answer
       if(index < length - 1) {
            return (
                <View className="review-con">
                    <View className="con">
                        <View className="text">{soure.en}</View>
                        {
                            word.map((value, id) => {
                                return (
                                    <AtButton
                                        key={id+value}
                                        onClick={this.clickToAnswer.bind(this, id , answer)}
                                    >{value}</AtButton>
                                )
                            })
                        }
                    </View>
                </View>
            );
        }
        return (<Done type="review"></Done>)
    }
}
 
export default Review;