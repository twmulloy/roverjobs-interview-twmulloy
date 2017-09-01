import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel
} from 'react-bootstrap'

import Form from './Form'
import Results from './Results'

export default class Search extends Component {
  static propTypes = {
    servicesTypes: PropTypes.arrayOf(PropTypes.object),
    selectedService: PropTypes.string,
    searchResponse: PropTypes.object
  }
  // static defaultProps = {}

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
