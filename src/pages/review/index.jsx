import Taro , {Component} from '@tarojs/taro'
import {View , Text} from '@tarojs/components'
import Axios from 'taro-axios'

import {AtButton} from 'taro-ui'

import './index.scss'

import Done from '../../Component/done/done'

// import { connect } from '@tarojs/redux'

// import {reviewIndex } from '../../actions/counter'

// @connect(({ counter }) => ({
//     counter
//   }), (dispatch) => ({
//       clickToAnswer(index){
//          dispatch(reviewIndex(index))
//       }
//   }))

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{en:'hello' , options:['你好' , "嗨" , '大的' , "答案"] , answer : 0} ,
            {en:'hi' , options:['你好' , "嗨" , '大的' , "答案"] , answer : 1},
            {en:'big' , options:['你好' , "嗨" , '大的' , "答案"] , answer : 2}
        ],
            err:[],
            index : 0,
            isError:false
        }
        this.indexAdd = this.indexAdd.bind(this)
        this.errTuoch = this.errTuoch.bind(this)
    }
    config={
        navigationBarTitleText: '复习单词'        
    }
    componentWillMount(){
        //请求复习单词的数据
        // this.wordGet()
    }

    //请求复习的单词
    wordGet(){
        let baseUrl = ''
        let _that = this
        Axios.get('').then((res)=>{
            _that.setState({
                word : res.data
            })
        })
    }
    // 当按钮的点击事件点击正确时，切换进行下一个单词的复习
    // 并进行判断state，是否将该单次加入错误队列中
    // 最后对state值进行重置
    indexAdd(){
        if(this.state.isError){
            let push = JSON.parse(JSON.stringify(this.state.data[this.state.index]))
            this.setState(preState=>({
                err : [...preState.err , push]
            }))
        }
        this.setState(preState=>({
            index : preState.index+1
        }))
    }
    // 当按钮错误的时候，改变state的状态值
    errTuoch(){
        this.setState(preState =>({
            isError : true
        }))
    }

    // 点击事件处理
    clickToAnswer(index){
        const option = this.state.data[this.state.index].answer
        if(option === index){
            this.indexAdd()
        }else{
            this.errTuoch()
        }
        console.log(this.state)
    }

    test(){
        this.setState(preState=>({
            index : preState.index+1
        }))
        console.log(this.state)
    }
    render() { 
        const {index} = this.state
        const {data} = this.state
        const soure = data[index]
        const  word = soure.options
        const length = data.length
       if(index < length-1) {
            return (
                <View className="review-con">
                    <View className="con">
                        <View className="text">{soure.en}</View>
                        {
                            word.map((value, index) => {
                                return (
                                    <AtButton
                                        key={index}
                                        onClick={this.clickToAnswer.bind(this, index)}
                                    >{value}</AtButton>
                                )
                            })
                        }
                    </View>
                </View>
            );
        }
        return (<Done></Done>)
    }
}
 
export default Review;