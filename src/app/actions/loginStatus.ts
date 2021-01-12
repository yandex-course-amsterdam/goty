import { ActionTypes, SetLoginStatusAction } from 'app/actions/types'

export const setLoginStatus = (status: boolean): SetLoginStatusAction => {
  return {
    type: ActionTypes.setLoginStatus,
    payload: status
  }
}
