import {
  SET_SERVICE,
  SET_SEARCH_RESPONSE
} from '../constants'
import actions from '../actions'

const initialState = {
  servicesTypes: [],
  selectedService: {},
  searchResponse: {}
}

const reducer = (state = initialState, action) => {
  const { type } = action

  switch (type) {
    // case SET_SERVICE:
    //   return state
    case SET_SEARCH_RESPONSE:
      const { searchResponse } = action
      return { ...state, searchResponse }
    default:
      return state
  }
}

export default reducer
