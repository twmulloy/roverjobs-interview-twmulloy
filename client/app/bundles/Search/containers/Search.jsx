import { connect } from 'react-redux'

import Search from '../components/Search'
import { search } from '../actions/Search'

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (query) => {
      dispatch(search(query))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
