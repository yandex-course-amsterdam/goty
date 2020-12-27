import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from 'app/components'
import { configureStore } from 'app/store'

const store = configureStore(window.__INITIAL_STATE__)

ReactDOM.hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
)
