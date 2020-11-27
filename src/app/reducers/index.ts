import { combineReducers } from 'redux'

import { UserInfo } from 'app/actions'
import { userInfoReducer } from './userInfoReducer'

export interface StoreState {
  userInfo: UserInfo
}

export const reducers = combineReducers<StoreState>({
  userInfo: userInfoReducer
})
