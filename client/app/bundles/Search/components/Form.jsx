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
      <ul>
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
      </ul>
    )
  }

  renderServiceTypes() {
    return (
      <ul>
        {this.props.serviceTypes.map((serviceType) => (
          <li key={`service-type_${serviceType.name}`}>
            <label>{serviceType.label}</label>
            {this.renderServices(serviceType.services)}
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              {this.renderServiceTypes()}
            </li>
            <li>
              <label>When?</label>
              <ul>
                <li>

                </li>
              </ul>
            </li>
          </ul>

          <Button type="submit" bsStyle="primary">Search</Button>
        </form>
      </div>
    )
  }
}
