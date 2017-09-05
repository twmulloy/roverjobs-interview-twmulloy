import {
  SET_SEARCH_RESPONSE,
  SET_SEARCH_PARAMS,
  SET_SELECTED_SERVICE,
  SET_DROP_OFF_ON,
  SET_PICK_UP_ON,
  SET_MIN_PRICE,
  SET_MAX_PRICE
} from '../constants'
import actions from '../actions'

const initialState = {
  servicesTypes: [],
  selectedService: {},
  searchResponse: {},
  searchParams: {},
  dropOffOn: '',
  pickUpOn: '',
  minPrice: 0,
  maxPrice: 0
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

    case SET_SEARCH_PARAMS:
      const { searchParams } = action
      return { ...state, searchParams }

    case SET_DROP_OFF_ON:
      const { dropOffOn } = action
      return { ...state, dropOffOn }

    case SET_PICK_UP_ON:
      const { pickUpOn } = action
      return { ...state, pickUpOn }

    case SET_MIN_PRICE:
      const { minPrice } = action
      return { ...state, minPrice }

    case SET_MAX_PRICE:
      const { maxPrice } = action
      return { ...state, maxPrice }

    default:
      return state
  }
}

export default reducer
