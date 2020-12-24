import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { reducers } from 'app/reducers'

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, applyMiddleware(thunk))
