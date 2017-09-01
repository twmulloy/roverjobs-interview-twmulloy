import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

export default class Results extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string,
        person_name: PropTypes.string
      })),
      page_count: PropTypes.number,
      previous: PropTypes.number
    })
  }
  static defaultProps = {
    searchResponse: {
      previous: 0
    }
  }

  renderResults() {
    const list = this.props.searchResponse.results || []

    if (list.length === 0) {
      return (
        <h2>No Results</h2>
      )
    }

    return (
      <div>
        <ol>
          {list.map((item) => (
            <li key={`result_${item.person_opk}`}>
              {item.person_name}
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
