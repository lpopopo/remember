import {
CUTDOWN,
INDEXADDOFREMEMBER,
DONE,
REVIEWINDEX,
REMEMBERINIT,
INDEXINIT,
REMEMBERONCEINIT
} from '../constants/counter'

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

export const  getRememberWord = () =>{
  const url = '?flag=1'
  return (dispatch) =>{
    axios.post(url ).then((res)=>{
      const  rememberWord = res.data
      const action = rememberInit(rememberWord)
      dispatch(action)
    })
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