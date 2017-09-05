import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
  PageHeader
} from 'react-bootstrap'

import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import {
  searchProxy,
  setSearchResponse,
  setDropOffOn,
  setPickUpOn,
  setMinPrice,
  setMaxPrice
} from '../actions'

const mapStateToProps = (state) => ({ ...state })

const mapDispatchToProps = (dispatch) => ({
  onDropOffOnChange: (date) => {
    dispatch(setDropOffOn(date))
  },
  onPickUpOnChange: (date) => {
    dispatch(setPickUpOn(date))
  },
  onMinPriceChange: (price) => {
    console.log('PRICE', price)
    dispatch(setMinPrice(price))
  },
  onMaxPriceChange: (price) => {
    dispatch(setMaxPrice(price))
  },
  onSearchSubmit: (service, params) => {
    dispatch(searchProxy(service, params))
  },
  onResultsPageSelect: (pageNumber) => {}
})

const Search = (props) => (
  <Grid>
    <Row>
      <Col>
        <PageHeader>Search</PageHeader>
      </Col>
    </Row>
    <Row>
      <Col>
        <SearchForm
          serviceTypes={props.serviceTypes}
          selectedService={props.selectedService}
          dropOffOn={props.dropOffOn}
          pickUpOn={props.pickUpOn}
          minPrice={props.minPrice}
          maxPrice={props.maxPrice}
          onDropOffOnChange={props.onDropOffOnChange}
          onPickUpOnChange={props.onPickUpOnChange}
          onMinPriceChange={props.onMinPriceChange}
          onMaxPriceChange={props.onMaxPriceChange}
          onSearchSubmit={props.onSearchSubmit}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <SearchResults
          searchResponse={props.searchResponse}
          onResultsPageSelect={props.onResultsPageSelect}
        />
      </Col>
    </Row>
  </Grid>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
