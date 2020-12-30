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

      // TODO: вынести создание токена и установку статуса в функции, отвечающие за логин
      // Для этого потребуется вынести туда же метод getUserInfo, так как при OAuth-авторизации данных на том уровне нет
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
