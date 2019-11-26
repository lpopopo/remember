
import {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'

import './glossary.scss'

var ReactCSSTransitionGroup = require('react-addons-css-transition-group')

class  GlossaryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            zh : '',
            show:false
         }
         this.enToZh = this.enToZh.bind(this)
    }    
    enToZh(){
        this.setState({
            zh : this.props.zh
        })
        setTimeout(()=>[
            this.setState({
                zh : ''
            })
        ] , 1000)
    }
    render() { 
        const en = this.props.en
        const zh = this.state.zh
        return (  
            <View className="glossaryCompenont">
                <View className="en" onClick={this.enToZh}>
                    {en}
                </View>
                <ReactCSSTransitionGroup>
                    <View className="zh">
                        {zh}
                    </View>
                </ReactCSSTransitionGroup>
            </View>
        );
    }
}
 
export default  GlossaryComponent;