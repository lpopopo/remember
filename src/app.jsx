import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/reviewrap/reviewrap',
      'pages/review/index',
      'pages/remenber/index',
      'pages/remenber/search/index',
      'pages/glossary/glossary',
      'pages/login/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#33333",
      selectedColor: "#FFC42F",
      backgroundColor: "#fff",
      borderStyle: "white",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "./assets/images/home.png",
          selectedIconPath: "./assets/images/home1.png"
        },
        {
          pagePath: "pages/reviewrap/reviewrap",
          text: "复习",
          iconPath: "./assets/images/review.png",
          selectedIconPath: "./assets/images/review1.png"
        }
      ]
    }
  }
  

  componentWillMount() {
    let uid=Taro.getStorageSync("uid")
    if(!uid){
      Taro.login({
        success:function(res){
          console.log(res)
          //code发送
          Taro.request({
            url: 'http://www.estationaeolus.xyz/vocabulary/info', 
            data: {
              code:res.code
            },
            method: "GET",
            header: {
              'content-type': 'application/json' // 默认值
            },
            //成功返回
            success: function (res) {
              console.log(res)
              if(res.statusCode==200){
                // Taro.navigateTo({
                //   url:'/pages/login/login'
                // }) 
                Taro.setStorageSync("uid",res.data.planlist[0].openid)
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
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
