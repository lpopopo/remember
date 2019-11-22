import { combineReducers } from 'redux'
import openModel from './modelReducer'
import counter from './counter'
import reviewer from './review'

export default combineReducers({
    openModel,
    counter,
    reviewer,
})
