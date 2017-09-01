import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import searchReducer from '../reducers/Search'

const middleware = [thunk]

export default (props, railsContext) => {
  const combinedReducer = combineReducers({
    search: searchReducer,
    railsContext
  })
  const combinedProps = { ...props, railsContext }
  return applyMiddleware(...middleware)(createStore)(combinedReducer, combinedProps)
}
