import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import searchReducer from './searchReducer';
export interface RootState {}

const rootReducer = combineReducers({
	search: searchReducer,
});

const middleWares = applyMiddleware(thunk);

export default createStore(rootReducer, middleWares);
