import {
  SET_SEARCH_RESPONSE,
  SET_SELECTED_SERVICE,
  SET_DROP_OFF_ON,
  SET_PICK_UP_ON
} from '../constants'
import api from '../services/api'

export const setSearchResponse = (searchResponse) => ({
  type: SET_SEARCH_RESPONSE,
  searchResponse
})

export const setSelectedService = (selectedService) => ({
  type: SET_SELECTED_SERVICE,
  selectedService
})

export const setDropOffOn = (dropOffOn) => ({
  type: SET_DROP_OFF_ON,
  dropOffOn
})

export const setPickUpOn = (pickUpOn) => ({
  type: SET_PICK_UP_ON,
  pickUpOn
})

export const searchProxy = (service, params) => {
  return (dispatch) => {
    return api.show(`/search/${service.value}`, params)
      .then((resp) => {
        if (resp.ok) {
          return resp.body
        }
      })
      .then((data) => {
        dispatch(setSearchResponse(data))
        dispatch(setSelectedService(service))
      })
  }
}
