import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Results extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string,
        person_name: PropTypes.string
      }))
    })
  }
  // static defaultProps = {}

  renderResults() {
    const list = this.props.searchResponse.results || []

    if (list.length === 0) {
      return (
        <h2>No Results</h2>
      )
    }

    return (
      <ol>
        {list.map((item) => (
          <li key={`result_${item.person_opk}`}>
            {item.person_name}
          </li>
        ))}
      </ol>
    )
  }

  render() {
    return (
      <div>
        <h1>Results</h1>
        {this.renderResults()}
      </div>
    )
  }
}
