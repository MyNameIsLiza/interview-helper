import {combineReducers} from 'redux'
import categoriesReducer from './categoriesReducer'
import topicsReducer from "./topicsReducer";

export default combineReducers({
    categoriesReducer: categoriesReducer,
    topicsReducer: topicsReducer,
})
