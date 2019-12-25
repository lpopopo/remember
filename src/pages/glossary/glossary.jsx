import Taro , {Component} from '@tarojs/taro'
import {View  , Text} from '@tarojs/components'
import  './glossary.scss'

import GlossaryComponent from '../../Component/glossary/glossary'

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            word : []
        }

    }
    config = {
        navigationBarTitleText: '单词本',
        navigationBarBackgroundColor: "#FFC42F",
    }
    componentWillMount(){
      if(this.state.word.length === 0){
        const openid=Taro.getStorageSync("uid");
        const that=this;
        Taro.request({
          url: 'http://www.estationaeolus.xyz:8080/vocabulary/hasLearned', 
          data: {
            openid:openid,
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          //成功返回
          success: function (res) {
              console.log(res)
            if(res.statusCode==200){
              that.setState({
                word : res.data.data
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
    }
    render() { 
        const data = this.state.word
          const ele =   data.map((value , index)=>{
                return(
                    <GlossaryComponent  
                    en={value.en}
                    zh={value.zh}
                    key={index}
                    ></GlossaryComponent>
                )
            })
            return(
                <View>
                    {ele}
                </View>
            )
    }
}
 
export default Glossary;