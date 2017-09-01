import React from 'react'
import PropTypes from 'prop-types'

const InputRadio = ({ label, name, value, isSelected, onClick, ...rest }) => {
  const forId = `input-radio_${value}`

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
        name={name}
        value={value}
        defaultChecked={isSelected}
        style={{
          visibility: 'hidden'
        }}
      />
      <label
        htmlFor={forId}
        onClick={onClick}
        style={{
          textDecoration: isSelected ? 'underline' : 'none',
          cursor: 'pointer'
        }}
      >
        {label}
      </label>
    </div>
  )
}

export default InputRadio
