import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InputRadio from './InputRadio'

export default class Form extends Component {
  static propTypes = {
    serviceTypes: PropTypes.arrayOf(PropTypes.object)
  }
  // static defaultProps = {}

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
              defaultChecked={service.defaultChecked}
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
    console.log(this.props)
    return (
      <div>
        <h1>Form</h1>
        <form>
          <ul>
            <li>
              {this.renderServiceTypes()}
            </li>
            <li>
              <ul>
                <li>
                  <label htmlFor="input_address">Dog Boarding near</label>
                  <input id="input_address" type="text" name/>
                </li>
                <li>

                </li>
              </ul>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}
