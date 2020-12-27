import { createStore, applyMiddleware, compose, Store } from 'redux'

import thunk from 'redux-thunk'

import { reducers } from 'app/reducers'
import { isServer } from 'app/utils'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    __INITIAL_STATE__: Record<string, any>
  }
}

function getComposeEnhancers() {
  if (process.env.NODE_ENV !== 'production' && !isServer) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  return compose
}

const composeEnhancers = getComposeEnhancers()

export const configureStore = (initialState = {}): Store => {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}
