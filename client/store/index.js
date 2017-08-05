import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import truck from './truck'


const reducer = combineReducers({user, truck})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedMiddleware = composeEnhancers(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, composedMiddleware)

export default store
export * from './user'
export * from './truck'
