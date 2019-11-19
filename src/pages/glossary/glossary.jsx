import Taro , {Component} from '@tarojs/taro'
import {View  , Text} from '@tarojs/components'
import  './glossary.scss'

import GlossaryComponent from '../../Component/glossary/glossary'

class Glossary extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            word : [{en : 'test' , zh : '测试'} , {en : "hello"  , zh : "你好"} , {en:'hi' , zh :'嗨'}]
        }

    }
    config = {
        navigationBarTitleText: '生词本',
        navigationBarBackgroundColor: "#FFC42F",
    }
    render() { 
        const data = this.state.word
          const ele =   data.map((value , index)=>{
                return(
                    <GlossaryComponent  
                    en={value.en}
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