import React from 'react'

import client from './client'
import Search from './component'

// Retrieve bootstrapped client data
const {
  ...rest
} = window.env

client(
  <Search {...rest} />
)
