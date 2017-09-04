import { connect } from 'react-redux'

import Search from '../components/Search'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
