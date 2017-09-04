import ReactOnRails from 'react-on-rails'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from '../reducers'
import SearchContainer from '../containers/Search'

const Store = (props, railsContext) => {
  return createStore(reducers, props)
}

ReactOnRails.registerStore({ Store })

const Search = (props, railsContext) => {
  const store = ReactOnRails.getStore('Store')
  return (
    <Provider store={store}>
      <SearchContainer />
    </Provider>
  )
}

ReactOnRails.register({ Search })
