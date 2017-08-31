import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Results from './Results'

export default class Search extends Component {
  static propTypes = {
    servicesTypes: PropTypes.arrayOf(PropTypes.object),
    selectedService: PropTypes.string,
    searchResponse: PropTypes.object
  }
  // static defaultProps = {}

  render() {
    // console.log(this.props)
    return (
      <div>
        <h1>Search</h1>
        <Form
          serviceTypes={this.props.serviceTypes}
          selectedService={this.props.selectedService}
        />
        <Results searchResponse={this.props.searchResponse} />
      </div>
    )
  }
}
