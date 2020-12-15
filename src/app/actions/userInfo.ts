import { Dispatch } from 'redux'

import {
  ActionTypes,
  FetchUserInfoAction,
  UserInfo,
  SetUserInfoAction
} from 'app/actions'
import { getUserInfo } from 'app/api/Api'

export const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await getUserInfo()

      // eslint-disable-next-line no-restricted-syntax
      for (const item in data) {
        if (data[item] === null) {
          data[item] = ''
        }
      }

      dispatch<FetchUserInfoAction>({
        type: ActionTypes.fetchUserInfo,
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const setUserInfo = (userInfo: UserInfo): SetUserInfoAction => {
  return {
    type: ActionTypes.setUserInfo,
    payload: userInfo
  }
}
