import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel
} from 'react-bootstrap'

import Form from '../components/Form'
import Results from '../components/Results'

export default class Search extends Component {
  constructor(props, context) {
    super(props, context)
    console.log('<Search/>', arguments)
  }

  render() {
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
                serviceTypes={this.props.serviceTypes}
                selectedService={this.props.selectedService}
              />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Results searchResponse={this.props.searchResponse} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

// export default connect()(Search)
