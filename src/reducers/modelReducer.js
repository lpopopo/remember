import { MAKE_SURE } from '../constants/modelType'

const modelState = {
    value: 0,
    title: '未选择'
}
  
export default function openModel (state = modelState, action) {
    switch (action.type) {
      case MAKE_SURE:
        return {
            ...state,
            value: action.value,
            title: action.title
        }
      default:
        return state
    }
}