import {
    GETDATA,
    INDEXADD,
    ERRTOUCH
}  from '../constants/review'
import {axios} from 'taro-axios'

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
    const url = ''
    const user = {openid:''}
    return (dispatch)=>{
        axios.post(url , user).then((res)=>{
            const data = res.data
            const action = ajax(data)
            dispatch(action)
        })
    }
}
