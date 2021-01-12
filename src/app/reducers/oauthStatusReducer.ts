import {
  Action,
  OAuthStatus,
  OAuthStatusInitial,
  ActionTypes
} from 'app/actions'

export const oauthStatusReducer = (
  state: OAuthStatus = OAuthStatusInitial,
  action: Action
): OAuthStatus => {
  switch (action.type) {
    case ActionTypes.setOAuthStatus:
      return { ...state, status: action.payload }
    default:
      return state
  }
}
