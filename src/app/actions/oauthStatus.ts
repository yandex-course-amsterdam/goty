import { ActionTypes, SetOAuthStatusAction } from 'app/actions/types'

export const setOAuthStatus = (status: boolean): SetOAuthStatusAction => {
  return {
    type: ActionTypes.setOAuthStatus,
    payload: status
  }
}
