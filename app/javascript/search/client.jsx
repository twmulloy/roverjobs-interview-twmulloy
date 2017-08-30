import React from 'react'
import { render } from 'react-dom'

const client = (components) => {
  render(
    <div>
      {components}
    </div>,
    document.getElementById('client')
  )
}

export default client
