import {
CUTDOWN,
INDEXADD,
DONE,
REVIEWINDEX,
REMEMBERINIT,
} from '../constants/counter'

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

export  const indexAdd = () => {
  return{
    type : INDEXADD
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

export const rememberInit = ()=>{
  return{
    type:REMEMBERINIT
  }
}

