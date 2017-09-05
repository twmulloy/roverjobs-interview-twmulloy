import {
  SET_SEARCH_RESPONSE,
  SET_SELECTED_SERVICE,
  SET_DROP_OFF_ON,
  SET_PICK_UP_ON
} from '../constants'
import actions from '../actions'

const initialState = {
  servicesTypes: [],
  selectedService: {},
  searchResponse: {},
  dropOffOn: '',
  pickUpOn: ''
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

    case SET_DROP_OFF_ON:
      const { dropOffOn } = action
      return { ...state, dropOffOn }

    case SET_PICK_UP_ON:
      const { pickUpOn } = action
      return { ...state, pickUpOn }

    default:
      return state
  }
}

export default reducer
