import {  CUTDOWN ,  INDEXADD , DONE  , REVIEWINDEX} from '../constants/counter'
// 首先进行每10个单词进行请求


const INITIAL_STATE = {
  down : 10 ,
  word : [{en: 'hello'  , zh : '你好'}, {en : 'hi' , zh : '嗨'} , {en : 'big' , zh:'大的'} ] ,
  index : 0,
  finall:3,
  review: [{en:'hello' , options:['你好' , "嗨" , '大的' , "答案"] , answer : 0} ,{en:'hi' , options:['你好' , "嗨" , '大的' , "答案"] , answer : 1}],
  reIndex:0,
  err : [],
  isError:false
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

     default:
       return state
  }
}
