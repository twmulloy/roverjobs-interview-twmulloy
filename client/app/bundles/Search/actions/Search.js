import { UPDATE_SEARCH_RESPONSE } from '../constants/Search'
import api from '../api'

export const updateSearchResponse = (response) => ({
  type: UPDATE_SEARCH_RESPONSE,
  response
})

export const search = (query) => (
  (dispatch) => (
    api.show('test').then((resp) => {
      if (resp.ok) {
        dispatch(actions.setSearchResponse(resp))
      }
    })
  )
)
