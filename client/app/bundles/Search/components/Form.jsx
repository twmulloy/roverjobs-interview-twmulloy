import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import InputRadio from './InputRadio'
import actions from '../actions'

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
    onServiceSelect: PropTypes.func.isRequired
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleServiceClick(service) {
    this.props.onServiceSelect(service)
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
              onClick={() => this.handleServiceClick(service)}
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderServiceTypes()}
        <div>
          <label>When?</label>
        </div>

        <Button type="submit" bsStyle="primary">Search</Button>
      </form>
    )
  }
}
