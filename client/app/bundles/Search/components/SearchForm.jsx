import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

import InputRadio from './InputRadio'
import actions from '../actions'

const formatDate = (datetime) => {
  const date = new Date(datetime)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()
  return [year, month, day].join('-')
}

export default class SearchForm extends Component {
  static propTypes = {
    serviceTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      services: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })).isRequired
    })),
    selectedService: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired,
    dropOffOn: PropTypes.string,
    pickUpOn: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    onDropOffOnChange: PropTypes.func.isRequired,
    onPickUpOnChange: PropTypes.func.isRequired,
    onMinPriceChange: PropTypes.func.isRequired,
    onMaxPriceChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getSearchFilters() {
    let params = {}

    // Date
    if (this.props.dropOffOn) {
      params.start_date = formatDate(this.props.dropOffOn)
    }
    if (this.props.pickUpOn) {
      params.end_date = formatDate(this.props.pickUpOn)
    }

    // Price
    if (Math.floor(this.props.minPrice) >= 0) {
      params.minprice = this.props.minPrice
    }
    if (Math.floor(this.props.maxPrice) >= 0) {
      params.maxprice = this.props.maxPrice
    }

    console.log(params)

    return params
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSearchSubmit(
      this.props.selectedService,
      this.getSearchFilters()
    )
  }

  renderServices(services) {
    return (
      <div>
        {services.map((service) => {
          return (
            <InputRadio
              key={`service_${service.value}`}
              name="service"
              label={service.label}
              value={service.value}
              isSelected={service.value === this.props.selectedService.value}
              onClick={() => this.props.onSearchSubmit(service, this.getSearchFilters())}
            />
          )
        })}
      </div>
    )
  }

  renderServiceTypes() {
    const serviceTypes = this.props.serviceTypes

    if (!serviceTypes) {
      return
    }

    return (
      <div>
        {this.props.serviceTypes.map((serviceType) => (
          <div key={`service-type_${serviceType.value}`}>
            <label>{serviceType.label}</label>
            {this.renderServices(serviceType.services)}
          </div>
        ))}
      </div>
    )
  }

  renderDateRange() {
    return (
      <Grid>
        <Row>
          <Col>
            <label>When?</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePicker
              placeholder="Drop off"
              onChange={this.props.onDropOffOnChange}
              value={this.props.dropOffOn}
            />
          </Col>
          <Col>
            <DatePicker
              placeholder="Pick up"
              onChange={this.props.onPickUpOnChange}
              value={this.props.pickUpOn}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  renderPriceRange() {
    return (
      <Grid>
        <Row>
          <Col>
            <label>Price</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="number"
              defaultValue={this.props.minPrice}
              placeholder="Min price"
              onChange={(e) => {
                this.props.onMinPriceChange(parseInt(e.target.value, 10))
              }}
              step={1}
              min={0}
              max={this.props.maxPrice}
            />
          </Col>
          <Col>
            <input
              type="number"
              defaultValue={this.props.maxPrice}
              placeholder="Max price"
              onChange={(e) => {
                this.props.onMaxPriceChange(parseInt(e.target.value, 10))
              }}
              step={1}
              min={this.props.minPrice}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderServiceTypes()}
        {this.renderDateRange()}
        {this.renderPriceRange()}
        <Button type="submit" bsStyle="primary">Search</Button>
      </form>
    )
  }
}
