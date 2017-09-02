import superagent from 'superagent'

const request = (method, url) => (
  superagent[method](url)
    .accept('json')
    .type('json')
    .set('X-Requested-With', 'XMLHttpRequest')
)

const api = {
  show(url, payload) {
    return request('get', url).query(payload)
  }
}

export default api
