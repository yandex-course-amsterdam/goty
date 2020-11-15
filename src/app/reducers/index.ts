import { combineReducers } from 'redux'

import { userDataReducer } from './userDataReducer'
import { dataStatusReducer } from './dataStatusReducer'

export const reducers = combineReducers({
  userData: userDataReducer,
  dataStatus: dataStatusReducer
})
