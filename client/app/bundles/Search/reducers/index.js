import {
  SET_SEARCH_RESPONSE,
  SET_SELECTED_SERVICE
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
    case SET_SELECTED_SERVICE:
      const { selectedService } = action
      return { ...state, selectedService }
    case SET_SEARCH_RESPONSE:
      const { searchResponse } = action
      return { ...state, searchResponse }
    default:
      return state
  }
}

export default reducer
