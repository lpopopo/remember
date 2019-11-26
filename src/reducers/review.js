import {
    GETDATA,
    INDEXADD,
    ERRTOUCH
} from '../constants/review'


const  INIT_STATUS =  {
    data:  [
        {en: "hello" , options :["你好" , "嗨" , "打的" , "测试"] , answer :0}
],
    index :0,
    err:[],
    isError:false
}


export default  function reviewer(state = INIT_STATUS , action){
    switch(action.type){
        case GETDATA:
            let getData = JSON.parse(JSON.stringify(state))
            getData.data = JSON.parse(JSON.stringify(action.data))
            return getData
            case INDEXADD:
                let indexAdd = JSON.parse(JSON.stringify(state))
                if(indexAdd.isError){
                    indexAdd.err = [...state.err , JSON.parse(JSON.stringify(state.data[state.index]))]
                }
                indexAdd.index++
                return indexAdd
                case ERRTOUCH : 
                let err =  JSON.parse(JSON.stringify(state))
                if(!err.isError){
                    err.isError = true
                }
                return err
        default : 
        return state
    }
}