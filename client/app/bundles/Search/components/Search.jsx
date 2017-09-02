import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel
} from 'react-bootstrap'

import Form from '../components/Form'
import Results from '../components/Results'

const Search = (props) => {
  return (
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
              serviceTypes={props.serviceTypes}
              selectedService={props.selectedService}
            />
          </Panel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Results searchResponse={props.searchResponse} />
        </Col>
      </Row>
    </Grid>
  )
}

export default Search
