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
    const { value } = service
    const queryParams = { type: value }
    dispatch(searchProxy(queryParams))
  }
})

const Search = ({
  serviceTypes,
  selectedService,
  searchResponse,
  onServiceSelect
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
        <Results searchResponse={searchResponse} />
      </Col>
    </Row>
  </Grid>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
