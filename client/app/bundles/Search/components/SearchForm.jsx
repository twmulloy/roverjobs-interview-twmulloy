import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup, FormControl,
  InputGroup
} from 'react-bootstrap'
import DatePicker from 'react-bootstrap-date-picker'

import InputRadio from './InputRadio'
import { mapSearchFilters } from '../actions'

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
    updateSearchParams: PropTypes.func.isRequired,
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

  getSearchParams() {
    return mapSearchFilters(this.props)
  }

  handleSubmit(e) {
    e.preventDefault()
    const searchParams = this.getSearchParams()
    this.props.updateSearchParams(searchParams)
    this.props.onSearchSubmit(this.props.selectedService, searchParams)
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
              onClick={(e) => {
                const searchParams = this.getSearchParams()
                this.props.onSearchSubmit(service, searchParams)
              }}
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
      <Grid>
        {this.props.serviceTypes.map((serviceType) => (
          <Row key={`service-type_${serviceType.value}`}>
            <Col>
              <label>{serviceType.label}</label>
              {this.renderServices(serviceType.services)}
            </Col>
          </Row>
        ))}
      </Grid>
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
          <Col md={3}>
            <FormGroup>
              <DatePicker
                placeholder="Drop off"
                onChange={this.props.onDropOffOnChange}
                value={this.props.dropOffOn}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <DatePicker
                placeholder="Pick up"
                onChange={this.props.onPickUpOnChange}
                value={this.props.pickUpOn}
              />
            </FormGroup>
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
          <Col md={3}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl
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
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl
                  type="number"
                  defaultValue={this.props.maxPrice}
                  placeholder="Max price"
                  onChange={(e) => {
                    this.props.onMaxPriceChange(parseInt(e.target.value, 10))
                  }}
                  step={1}
                  min={this.props.minPrice}
                />
              </InputGroup>
            </FormGroup>
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
