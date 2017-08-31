import React from 'react'

const InputRadio = ({ label, name, value, defaultChecked, ...rest }) => {
  const forId = `input-radio_${value}`
  return (
    <div {...rest}>
      <input type="radio" id={forId} name={name} value={value} defaultChecked={defaultChecked} />
      <label htmlFor={forId}>{label}</label>
    </div>
  )
}

export default InputRadio
