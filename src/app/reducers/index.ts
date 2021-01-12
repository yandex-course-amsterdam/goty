import { combineReducers } from 'redux'

import { UserInfo, OAuthStatus, loginStatus } from 'app/actions'
import { userInfoReducer } from './userInfoReducer'
import { oauthStatusReducer } from './oauthStatusReducer'
import { loginStatusReducer } from './loginStatusReducer'

export interface StoreState {
  userInfo: UserInfo
  oauthStatus: OAuthStatus
  loginStatus: loginStatus
}

export const reducers = combineReducers<StoreState>({
  userInfo: userInfoReducer,
  oauthStatus: oauthStatusReducer,
  loginStatus: loginStatusReducer
})
