import {combineReducers} from 'redux'
import categoriesReducer from './categoriesReducer'
import topicsReducer from "./topicsReducer";
import questionsReducer from "./questionsReducer";

export default combineReducers({
    categoriesReducer: categoriesReducer,
    topicsReducer: topicsReducer,
    questionsReducer: questionsReducer,
})
