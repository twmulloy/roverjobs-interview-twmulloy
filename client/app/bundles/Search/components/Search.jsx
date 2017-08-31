import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Results from './Results'

export default class Main extends Component {
  static propTypes = {}
  static defaultProps = {}

  render() {
    return (
      <div>
        <h1>Search</h1>
        <Form />
        <Results />
      </div>
    )
  }
}
