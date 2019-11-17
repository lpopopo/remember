import { MAKE_SURE  } from '../constants/modelType'


export const makeSure = (value,title) => {
    return {
      type: MAKE_SURE,
      value: value,
      title:title
    }
}


