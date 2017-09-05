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
  setSearchResponse
} from '../actions'

const mapStateToProps = (state) => ({ ...state })
const mapDispatchToProps = (dispatch) => ({
  onServiceSelect: (service) => {
    dispatch(searchProxy(service))
  },
  onResultsPageSelect: (pageNumber) => {

  }
})

const Search = ({
  serviceTypes,
  selectedService,
  searchResponse,
  onServiceSelect,
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
            onServiceSelect={onServiceSelect}
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
