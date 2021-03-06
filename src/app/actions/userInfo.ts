import { Dispatch } from 'redux'

import {
  ActionTypes,
  FetchUserInfoAction,
  UserInfo,
  SetUserInfoAction,
  setLoginStatus
} from 'app/actions'
import * as authApi from 'app/api/authApi'
import * as yandexApi from 'app/api/yandexApi'
import * as postgresApi from 'app/api/postgresApi'

import { setUserTheme, storeUserTheme } from 'app/utils'

export const fetchUserInfo = (isLogin = false) => {
  return async (dispatch: Dispatch): Promise<UserInfo | null> => {
    try {
      const { data } = await yandexApi.getUserInfo()
      // stub null fields to make sure forms will work properly
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
        authApi.createToken(data.login!)
        dispatch(setLoginStatus(true))

        // Сохранение юзера в postgres
        const {
          data: { payload: user }
        } = await postgresApi.setUser(data)
        // Фетч темы из postgres по id найденного/созданного юзера
        const {
          data: { payload: theme }
        } = await postgresApi.getUserTheme(user.id)
        setUserTheme(theme)
        storeUserTheme(theme)
      }

      return data
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export const setUserInfo = (userInfo: UserInfo): SetUserInfoAction => {
  return {
    type: ActionTypes.setUserInfo,
    payload: userInfo
  }
}
