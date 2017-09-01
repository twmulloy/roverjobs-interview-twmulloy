import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

export default class Results extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string.isRequired,
        person_name: PropTypes.string.isRequired
      })).isRequired,
      page_count: PropTypes.number.isRequired,
      previous: PropTypes.number.isRequired
    })
  }
  static defaultProps = {
    searchResponse: {
      previous: 0
    }
  }

  renderResults() {
    const results = this.props.searchResponse.results

    if (!results) {
      return (
        <h2>No Results</h2>
      )
    }

    return (
      <div>
        <ol>
          {results.map((result) => (
            <li key={`result_${result.person_opk}`}>
              {result.person_name}
            </li>
          ))}
        </ol>

        <Pagination
          prev
          next
          boundaryLinks
          items={this.props.searchResponse.page_count}
          maxButtons={7}
          activePage={this.props.searchResponse.previous+1}
        />
      </div>
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
