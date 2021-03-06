import ReactOnRails from 'react-on-rails'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'
import SearchContainer from '../containers/Search'

const middleware = [thunk]
const Store = (props, railsContext) => {
  return applyMiddleware(...middleware)(createStore)(reducers, props)
}
const Search = (props, railsContext) => (
  <Provider store={ReactOnRails.getStore('Store')}>
    <SearchContainer />
  </Provider>
)

ReactOnRails.registerStore({ Store })
ReactOnRails.register({ Search })
