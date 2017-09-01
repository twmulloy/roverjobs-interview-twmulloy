import ReactOnRails from 'react-on-rails'

import Search from './Search'
import Store from '../stores/Search'

ReactOnRails.registerStore({
  Store
})

ReactOnRails.register({
  Search
})
