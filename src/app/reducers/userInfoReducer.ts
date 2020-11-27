import { Action, ActionTypes, UserInfo, UserInfoInitial } from 'app/actions'

export const userInfoReducer = (
  state: UserInfo = UserInfoInitial,
  action: Action
): UserInfo => {
  switch (action.type) {
    case ActionTypes.setUserInfo:
      return { ...state, ...action.payload }
    case ActionTypes.fetchUserInfo:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
