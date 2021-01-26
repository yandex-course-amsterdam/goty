import { Dispatch } from 'redux'

import {
  ActionTypes,
  FetchUserInfoAction,
  UserInfo,
  SetUserInfoAction,
  setLoginStatus
} from 'app/actions'
import { getUserInfo, createToken, getUserTheme, setUser } from 'app/api/Api'

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

        // Сохранение юзера в postgres
        const { data: user } = await setUser(data)
        // Фетч темы из postgres по id найденного/созданного юзера
        const { data: theme } = await getUserTheme(user.id)
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
