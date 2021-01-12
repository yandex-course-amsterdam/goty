import {
  Action,
  loginStatus,
  loginStatusInitial,
  ActionTypes
} from 'app/actions'

export const loginStatusReducer = (
  state: loginStatus = loginStatusInitial,
  action: Action
): loginStatus => {
  switch (action.type) {
    case ActionTypes.setLoginStatus:
      return { ...state, status: action.payload }
    default:
      return state
  }
}
