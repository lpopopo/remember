import {  CUTDOWN ,  INDEXADD , DONE  , REVIEWINDEX , REMEMBERINIT , INDEXINIT} from '../constants/counter'
// 首先进行每10个单词进行请求


const INITIAL_STATE = {
  down : 10 ,
  word : [{en: 'hello'  , zh : '你好'}, {en : 'hi' , zh : '嗨'} , {en : 'big' , zh:'大的'} ] ,
  index : 0,
  finall:3,
  RememberOnce : false
}


export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CUTDOWN:
       let back = JSON.parse(JSON.stringify(state))
      if(state.down <= 0){
        back.down = 10
        if(back.index <  back.word.length  ){
          back.index++
        }
        return back
      }
      back.down--
      return back
       case INDEXADD: 
       let backA = JSON.parse(JSON.stringify(state))
       if(backA.index <  backA.word.length -1 ){
        backA.index++
      }
       backA.down = 10
       return backA
       case REVIEWINDEX : 
       let review = JSON.parse(JSON.stringify(state))
       const answer = review.word[review.index].answer
       if( answer === action.index){
         if(review.isError){
           review.err.push(JSON.parse(JSON.stringify(review.word[review.index])))
         }
         review.index++
         review.isError = false
       }
       review.isError = true
       return review
       case REMEMBERINIT:
         let rememberInit = JSON.parse(JSON.stringify(state))
         rememberInit.RememberOnce = true
         return rememberInit
         case INDEXINIT:
           let indexInit = JSON.parse(JSON.stringify(state))
           indexInit.index = 0
           return indexInit
     default:
       return state
  }
}
