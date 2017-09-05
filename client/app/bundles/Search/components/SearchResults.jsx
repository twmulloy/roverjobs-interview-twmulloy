import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Media,
  Pagination,
  Image,
  ListGroup, ListGroupItem
} from 'react-bootstrap'
import { compact } from 'lodash'

const addressHelper = ({ neighborhood, city, state, zip }) => {
  return compact([
    neighborhood,
    city,
    state,
    zip
  ]).join(', ').toUpperCase()
}

const resultNumberHelper = (resultNumber, page, per_page) => {
  return (page * per_page) + resultNumber + '.'
}

export default class SearchResults extends Component {
  static propTypes = {
    searchResponse: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        person_opk: PropTypes.string.isRequired,
        person_name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        neighborhood: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        person_summary: PropTypes.shape({
          first_name: PropTypes.string.isRequired
        }).isRequired
      })),
      count: PropTypes.number,
      page_count: PropTypes.number,
      previous: PropTypes.string,
      query: PropTypes.shape({
        page: PropTypes.number.isRequired,
        per_page: PropTypes.number.isRequired
      }).isRequired
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

  renderPagination() {
    if (this.props.searchResponse.page_count <= 1) {
      return
    }

    return (
      <Pagination
        prev
        next
        boundaryLinks
        items={this.props.searchResponse.page_count}
        maxButtons={7}
        activePage={this.props.searchResponse.query.page}
        onSelect={this.handlePageSelect}
      />
    )
  }

  renderResults() {
    const results = this.props.searchResponse.results || []
    const { page, per_page } = this.props.searchResponse.query

    if (results.length === 0) {
      return
    }

    return (
      <div>
        {this.renderPagination()}
        <ListGroup>
        {results.map((result, i) => {
          const resultNumber = resultNumberHelper(i+1, page-1, per_page)
          const address = addressHelper(result)
          const name = result.person_summary.first_name || result.person_name

          return (
            <ListGroupItem key={`result_${result.person_opk}`}>
              <Media>
                <Media.Left align="top">
                  <Image src={result.thumb} />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{resultNumber} {name}</Media.Heading>
                  <h5>{result.title}</h5>
                  <h6>{address}</h6>
                  <p>&ldquo;{result.description}&rdquo;</p>
                </Media.Body>
              </Media>
            </ListGroupItem>
          )
        })}
        </ListGroup>
        {this.renderPagination()}
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
