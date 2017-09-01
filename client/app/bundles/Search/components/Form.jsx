import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

import InputRadio from './InputRadio'

export default class Form extends Component {
  static propTypes = {
    serviceTypes: PropTypes.arrayOf(PropTypes.object),
    selectedService: PropTypes.string
  }
  // static defaultProps = {}

  handleSubmit(e) {
    e.preventDefault()
  }

  renderServices(services) {
    return (
      <div>
        {services.map((service) => {
          return (
            <InputRadio
              key={`service_${service.name}`}
              name="service"
              label={service.label}
              value={service.value}
              isSelected={service.value === this.props.selectedService}
              onClick={() => {
                console.log('clicked')
              }}
            />
          )
        })}
      </div>
    )
  }

  renderServiceTypes() {
    return (
      <div>
        {this.props.serviceTypes.map((serviceType) => (
          <div key={`service-type_${serviceType.name}`}>
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
