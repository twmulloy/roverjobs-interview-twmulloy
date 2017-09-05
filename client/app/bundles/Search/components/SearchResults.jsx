import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Media,
  Pagination
} from 'react-bootstrap'

export default class SearchResults extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string.isRequired,
        person_name: PropTypes.string.isRequired
      })),
      count: PropTypes.number,
      page_count: PropTypes.number,
      previous: PropTypes.string,
      query: PropTypes.shape({
        page: PropTypes.number
      })
    }).isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
    searchParams: PropTypes.shape({
      start_date: PropTypes.string,
      end_date: PropTypes.string,
      minprice: PropTypes.number,
      maxprice: PropTypes.number,
      page: PropTypes.number
    }),
    selectedService: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired,
    updateSearchParams: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handlePageSelect = this.handlePageSelect.bind(this)
  }

  handlePageSelect(page) {
    const searchParams = { ...this.props.searchParams, page }
    this.props.updateSearchParams(searchParams)
    this.props.onSearchSubmit(this.props.selectedService, searchParams)
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
        {results.map((result) => (
          <Media key={`result_${result.person_opk}`}>
            {result.person_name}
          </Media>
        ))}

        <Pagination
          prev
          next
          boundaryLinks
          items={this.props.searchResponse.page_count}
          maxButtons={7}
          activePage={this.props.searchResponse.query.page}
          onSelect={this.handlePageSelect}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>{this.props.searchResponse.count} Results</h1>
        {this.renderResults()}
      </div>
    )
  }
}
