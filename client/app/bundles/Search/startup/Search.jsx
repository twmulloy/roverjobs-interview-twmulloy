import React from 'react'
import ReactOnRails from 'react-on-rails'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import searchReducer from '../reducers/Search'
import SearchContainer from '../containers/Search'

const Store = (props, railsContext) => {
  const reducers = combineReducers({ search: searchReducer })
  return createStore(reducers, props)
}

ReactOnRails.registerStore({
  Store
})

export default (props, railsContext) => {
  const searchProps = props.search
  const store = ReactOnRails.getStore('Store')
  return (
    <Provider store={store}>
      <SearchContainer {...searchProps} />
    </Provider>
  )
}
