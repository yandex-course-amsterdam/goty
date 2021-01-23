import { Dispatch } from 'redux'

import {
  ActionTypes,
  FetchUserInfoAction,
  UserInfo,
  SetUserInfoAction,
  setLoginStatus
} from 'app/actions'
import { getUserInfo, createToken, getUserTheme } from 'app/api/Api'

import { setUserTheme, storeUserTheme } from 'app/utils'

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

      if (isLogin) {
        createToken(data.login)
        dispatch(setLoginStatus(true))

        // Установка темы юзера
        const { data: theme } = await getUserTheme(data.id)
        console.log(theme)
        setUserTheme(theme)
        storeUserTheme(theme)
      }

      return data
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
