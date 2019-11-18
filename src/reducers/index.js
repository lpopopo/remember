import { combineReducers } from 'redux'
import openModel from './modelReducer'
import counter from './counter'

export default combineReducers({
    openModel,
    counter
})
