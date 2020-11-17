import { combineReducers } from 'redux'

import { userDataReducer } from './userDataReducer'

export const reducers = combineReducers({
  userData: userDataReducer
})
