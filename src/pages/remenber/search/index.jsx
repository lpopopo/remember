import {Component} from  '@tarojs/taro'

import {View , Text } from '@tarojs/components'
//引入md5加密方式进行百度翻译的接口url使用
import md5 from 'js-md5'
//引入taro-axios,因为taro不支持axios
import {axios}  from 'taro-axios'

import './index.scss'

import { connect } from '@tarojs/redux'
@connect(({ counter }) => ({
    counter
  }), (dispatch) => ({

  }))


class WordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordInEnglish :this.$router.params.en ,
            detail : null
        }

        this.updateWord = this.updateWord.bind(this)
        this.Inquire = this.Inquire.bind(this)
    }
    //在页面加载的初期，首先进行state的初始化，从store中获得当前的
   //英语单词，以供单词的查询
   componentDidMount () {
        // this.setState({
        //     wordInEnglish: this.props.world
        // })
        // console.log('detail')
    }
    componentDidShow () { 
        this.updateWord()
    }
    //用来请求查询单词翻译
    Inquire(){
        let appId = '20191112000356220'
        let salt = new Date().getTime()
        let key = 'BTuSfFwFuHsBZ1DZNhsc'
        let world = this.state.wordInEnglish
        const sign = md5(appId+world+salt+key)
        const URL = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${world}&from=en&to=zh&appid=${appId}&salt=${salt}&sign=${sign}`
        console.log("word is" )
        console.log(world)
        return new Promise((reslove , rej) =>{
        axios.get(URL).then(function(res){
            reslove(res.data['trans_result'][0].dst)
            console.log(res.data['trans_result'][0].dst)
        })   
       })
    }
    //用来设置state中的单词详情的信息
    updateWord(){
        let _that = this
        this.Inquire().then((value)=>{
            _that.setState({
                detail : value
            })
        })
    }

    config = {
        navigationBarTitleText: '单词详情'
      }
    render() { 
        return (
            <View className="detail-con">
                <View className="en">{this.state.wordInEnglish}</View>
                <View className="zh">{this.state.detail}</View>
            </View>
          );
    }
}
 
export default WordDetail;