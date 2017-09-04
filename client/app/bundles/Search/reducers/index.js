import {
  SET_SERVICE
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
    case SET_SERVICE:
      console.log(type)
      return state
    default:
      return state
  }
}

export default reducer
