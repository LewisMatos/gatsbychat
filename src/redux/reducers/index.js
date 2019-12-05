import {combineReducers} from 'redux'
import userReducer from './userReducer'
import roomReducer from './roomReducer'
import messageReducer from './messageReducer'

export default combineReducers({user: userReducer,room: roomReducer, message: messageReducer});