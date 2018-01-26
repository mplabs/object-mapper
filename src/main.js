// Include index.html in build
require('./index.html')

import React from 'react'
import { render } from 'react-dom'

import { App } from './components/app'

render(
  <App />,
  document.querySelector("[data-react-root]")
);
