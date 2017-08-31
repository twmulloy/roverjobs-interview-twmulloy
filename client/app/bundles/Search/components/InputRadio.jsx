import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputRadio extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    const forId = `input-radio_${this.props.value}`
    const {
      label,
      name,
      value,
      isSelected,
      onClick,
      ...rest
    } = this.props

    return (
      <div
        {...rest}
        style={{
          display: 'inline-block'
        }}
      >
        <input
          type="radio"
          id={forId}
          name={this.props.name}
          value={this.props.value}
          defaultChecked={this.props.isSelected}
          onChange={this.onChange}
          style={{
            visibility: 'hidden'
          }}
        />
        <label
          htmlFor={forId}
          onClick={this.props.onClick}
          style={{
            textDecoration: this.props.isSelected ? 'underline' : 'none',
            cursor: 'pointer'
          }}
        >
          {this.props.label}
        </label>
      </div>
    )
  }
}
