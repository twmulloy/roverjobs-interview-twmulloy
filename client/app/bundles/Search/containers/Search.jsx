import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel
} from 'react-bootstrap'

import Form from '../components/Form'
import Results from '../components/Results'
import {
  searchProxy,
  setSearchResponse,
  setDropOffOn,
  setPickUpOn
} from '../actions'

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => ({
  onServiceSelect: (service) => {
    dispatch(searchProxy(service))
  },
  onDropOffOnChange: (date) => {
    dispatch(setDropOffOn(date))
  },
  onPickUpOnChange: (date) => {
    dispatch(setPickUpOn(date))
  },
  onSearchSubmit: (service, params) => {
    dispatch(searchProxy(service, params))
  },
  onResultsPageSelect: (pageNumber) => {}
})

const Search = ({
  serviceTypes,
  selectedService,
  searchResponse,
  dropOffOn,
  pickUpOn,
  onServiceSelect,
  onDropOffOnChange,
  onPickUpOnChange,
  onSearchSubmit,
  onResultsPageSelect
}) => (
  <Grid>
    <Row>
      <Col>
        <PageHeader>Search</PageHeader>
      </Col>
    </Row>
    <Row>
      <Col>
        <Panel>
          <Form
            serviceTypes={serviceTypes}
            selectedService={selectedService}
            dropOffOn={dropOffOn}
            pickUpOn={pickUpOn}
            onServiceSelect={onServiceSelect}
            onDropOffOnChange={onDropOffOnChange}
            onPickUpOnChange={onPickUpOnChange}
            onSearchSubmit={onSearchSubmit}
          />
        </Panel>
      </Col>
    </Row>
    <Row>
      <Col>
        <Results
          searchResponse={searchResponse}
          onResultsPageSelect={onResultsPageSelect}
        />
      </Col>
    </Row>
  </Grid>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
