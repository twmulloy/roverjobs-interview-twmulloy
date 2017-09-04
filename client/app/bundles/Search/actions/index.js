import {
  SET_SERVICE
} from '../constants'
import api from '../services/api'

export const setService = (service) => (
  type: SET_SERVICE,
  service
)

export const searchProxy = (query) => (
  (dispatch) => {
    api.show('/search', query).then(resp => {
      if (resp.ok) {
        console.log(resp)
      }
    })
  }
)
