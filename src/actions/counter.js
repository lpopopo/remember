import {
CUTDOWN,
INDEXADDOFREMEMBER,
DONE,
REVIEWINDEX,
REMEMBERINIT,
INDEXINIT,
REMEMBERONCEINIT,
REMEMBERFINISH
} from '../constants/counter'

import Taro, { Component } from '@tarojs/taro'

import {axios} from 'taro-axios'

export const cutDown = () => {
  return {
    type : CUTDOWN 
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

export  const indexAddOfRemember = () => {
  return{
    type : INDEXADDOFREMEMBER
  }
}

export const done = () =>{
  return{
    type:DONE
  }
}

export const reviewIndex =(index) =>{
  return{
    type:REVIEWINDEX,
    index
  }
}

export const rememberInit = (data)=>{
  return{
    type:REMEMBERINIT,
    data
  }
}

export const indexInit = ()=>{
  return{
    type : INDEXINIT
  }
}

export const rememberOnce = () =>{
  return{
    type:REMEMBERONCEINIT
  }
}
export const startremember = () =>{
  const url = `http://www.estationaeolus.xyz/vocabulary/study`
  const openid=Taro.getStorageSync("uid");
  console.log('ajax',openid)
  return (dispatch)=>{
      axios.get(url ,{ params:{openid}}).then((res)=>{
          const data = res.data
          const action = rememberInit(data)
          console.log(res)
          dispatch(action)
      })
  }
}

export const rememberFishUpdate = () =>{
  return {
    type:REMEMBERFINISH
  }
}