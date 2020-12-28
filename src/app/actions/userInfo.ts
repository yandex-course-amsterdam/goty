import { Dispatch } from 'redux'

import {
  ActionTypes,
  FetchUserInfoAction,
  UserInfo,
  SetUserInfoAction,
  setLoginStatus
} from 'app/actions'
import { getUserInfo, createToken } from 'app/api/Api'

export const fetchUserInfo = (isLogin = false) => {
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

      // хз красиво ли, в противном случае нужно будет создавать токен и диспатчить serLoginStatus в трёх местах
      if (isLogin) {
        createToken(data.login)
        dispatch(setLoginStatus(true))
      }
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
