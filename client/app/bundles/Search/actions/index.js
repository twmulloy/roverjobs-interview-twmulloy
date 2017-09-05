import {
  SET_SEARCH_RESPONSE,
  SET_SELECTED_SERVICE
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

export const searchProxy = (service) => {
  return (dispatch) => {
    const queryParams = { type: service.value }
    return api.show('/search', queryParams)
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
