import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'

export default class SearchResults extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string.isRequired,
        person_name: PropTypes.string.isRequired
      })),
      page_count: PropTypes.number,
      previous: PropTypes.number
    }).isRequired
  }
  static defaultProps = {
    searchResponse: {
      results: [],
      page_count: 0,
      previous: 0
    }
  }

  constructor(props) {
    super(props)

    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect() {
    console.log('select', this)
  }

  renderResults() {
    const results = this.props.searchResponse.results || []

    if (results.length === 0) {
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
          onSelect={this.handlePageSelect}
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
