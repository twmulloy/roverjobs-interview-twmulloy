import {
  SET_SEARCH_RESPONSE,
  SET_SEARCH_PARAMS,
  SET_SELECTED_SERVICE,
  SET_DROP_OFF_ON,
  SET_PICK_UP_ON,
  SET_MIN_PRICE,
  SET_MAX_PRICE
} from '../constants'
import api from '../services/api'

export const setSearchResponse = (searchResponse) => ({
  type: SET_SEARCH_RESPONSE,
  searchResponse
})

export const setSearchParams = (searchParams) => ({
  type: SET_SEARCH_PARAMS,
  searchParams
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

export const setMinPrice = (minPrice) => ({
  type: SET_MIN_PRICE,
  minPrice
})

export const setMaxPrice = (maxPrice) => ({
  type: SET_MAX_PRICE,
  maxPrice
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

const formatDate = (datetime) => {
  const date = new Date(datetime)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()
  return [year, month, day].join('-')
}

export const mapSearchFilters = (props) => {
  let params = {}

  // Date
  if (props.dropOffOn) {
    params.start_date = formatDate(props.dropOffOn)
  }
  if (props.pickUpOn) {
    params.end_date = formatDate(props.pickUpOn)
  }

  // Price
  if (Math.floor(props.minPrice) >= 0) {
    params.minprice = props.minPrice
  }
  if (Math.floor(props.maxPrice) >= 0) {
    params.maxprice = props.maxPrice
  }

  return params
}
