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

const styles = {
  calendar: {
    display: 'inline-block'
  }
}

const formatDate = (datetime) => {
  const date = new Date(datetime)
  const month = ('0' + (date.getMonth()+1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  return [year, month, day].join('-')
}

export default class Form extends Component {
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
    onServiceSelect: PropTypes.func.isRequired,
    onDropOffOnChange: PropTypes.func.isRequired,
    onPickUpOnChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let params = {}

    if (this.props.dropOffOn) {
      params.start_date = formatDate(this.props.dropOffOn)
    }

    if (this.props.pickUpOn) {
      params.end_date = formatDate(this.props.pickUpOn)
    }

    // console.log(params)
    this.props.onSearchSubmit(this.props.selectedService, params)
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
              onClick={() => this.props.onServiceSelect(service)}
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

  renderDatePickers() {
    return (
      <div>
        <label>When?</label>
        <DatePicker
          style={styles.calendar}
          placeholder="Drop off"
          onChange={this.props.onDropOffOnChange}
          value={this.props.dropOffOn}
        />
        <DatePicker
          style={styles.calendar}
          placeholder="Pick up"
          onChange={this.props.onPickUpOnChange}
          value={this.props.pickUpOn}
        />
      </div>
    )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderServiceTypes()}
        {this.renderDatePickers()}
        <Button type="submit" bsStyle="primary">Search</Button>
      </form>
    )
  }
}
