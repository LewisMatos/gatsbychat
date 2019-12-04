import {combineReducers} from 'redux'
import userReducer from './userReducer'
import roomReducer from './roomReducer'

export default combineReducers({user: userReducer,room: roomReducer});