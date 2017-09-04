import {
  SET_SERVICE,
  SET_SEARCH_RESPONSE
} from '../constants'
import api from '../services/api'

export const setService = (service) => ({
  type: SET_SERVICE,
  service
})

export const setSearchResponse = (searchResponse) => ({
  type: SET_SEARCH_RESPONSE,
  searchResponse
})

export const searchProxy = (queryParams) => (
  (dispatch) => (
    api.show('/search', queryParams)
      .then((resp) => {
        if (resp.ok) {
          return resp.body
        }
      })
      .then((data) => {
        dispatch(setSearchResponse(data))
      })
  )
)
