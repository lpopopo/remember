import {  CUTDOWN ,  INDEXADDOFREMEMBER , DONE  , REVIEWINDEX , REMEMBERINIT , INDEXINIT , REMEMBERONCEINIT , REMEMBERFINISH} from '../constants/counter'
// 首先进行每10个单词进行请求


const INITIAL_STATE = {
  down:10,
  word : [] ,
  index : 0,
  finall:3,
  RememberOnce : true
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
       case INDEXADDOFREMEMBER: 
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
        //  rememberInit.index = 0
        //  rememberInit.RememberOnce = true
         const word = action.data.data
         rememberInit.word = word
         rememberInit.finall = word.length
         return rememberInit
         case INDEXINIT:
           let indexInit = JSON.parse(JSON.stringify(state))
           indexInit.index = 0
           return indexInit
           case REMEMBERONCEINIT:
             let RememberOnceData = JSON.parse(JSON.stringify(state))
             RememberOnceData.RememberOnce = false
             return RememberOnceData
             case REMEMBERFINISH:
               let rememberFish = JSON.parse(JSON.stringify(state))
               rememberFish.RememberOnce = true
               return rememberFish
     default:
       return state
  }
}
