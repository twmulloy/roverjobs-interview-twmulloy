import ReactOnRails from 'react-on-rails'
import React from 'react'
import { Provider } from 'react-redux'

import SearchContainer from '../containers/Search'

const Search = () => {
  const store = ReactOnRails.getStore('Store')
  return (
    <Provider store={store}>
      <SearchContainer />
    </Provider>
  )
}

export default Search
