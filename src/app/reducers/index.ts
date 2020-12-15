import { combineReducers } from 'redux'

import { UserInfo, OAuthStatus } from 'app/actions'
import { userInfoReducer } from './userInfoReducer'
import { oauthStatusReducer } from './oauthStatusReducer'

export interface StoreState {
  userInfo: UserInfo
  oauthStatus: OAuthStatus
}

export const reducers = combineReducers<StoreState>({
  userInfo: userInfoReducer,
  oauthStatus: oauthStatusReducer
})
