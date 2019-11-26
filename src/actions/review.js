import {
    GETDATA,
    INDEXADD,
    ERRTOUCH
}  from '../constants/review'
import {axios} from 'taro-axios'
import Taro from '@tarojs/taro'

export const  ajax = (data) => {
    //复习单词请求数据
    return{
        type : GETDATA,
        data
    }
}

export const indexAddOfReview = ()=>{
    return{
        type:INDEXADD
    }
}

export const errTouch = ()=>{
    return{
        type : ERRTOUCH
    }
}

export const getWord = () =>{
    const url = 'http://www.estationaeolus.xyz/vocabulary/selfTest'
    const openid=Taro.getStorageSync("uid");
    return (dispatch)=>{
        axios.get(url ,{
            params:{
                openid
            }
        }).then((res)=>{
            const data = res.data
            console.log(res)
            const action = ajax(data)
            dispatch(action)
        })
    }
}
