import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import { reducers } from 'app/reducers'
import { isServer } from 'app/utils'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

function getComposeEnhancers() {
  if (process.env.NODE_ENV !== 'production' && !isServer) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  return compose
}

const composeEnhancers = getComposeEnhancers()

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
)
