import { UPDATE_SEARCH_RESPONSE } from '../constants/Search'

const initialState = {
  servicesTypes: [],
  selectedService: {},
  searchResponse: {}
}

const searchReducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    case UPDATE_SEARCH_RESPONSE:
      console.log(`ACTION ${type}`, action)
      return state
    default:
      return state
  }
}

export default searchReducer
