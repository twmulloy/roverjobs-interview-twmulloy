import api from '../services/api'

const actions = {
  search(query) {
    return dispatch => {
      api.show('test').then(resp => {
        if (resp.ok) {
          console.log(resp)
        }
      })
    }
  }
}

export default actions
