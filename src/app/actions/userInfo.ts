import { Dispatch } from 'redux'

import { ActionTypes } from 'app/actions/types'
import { authApi } from 'app/api'

export interface UserInfo {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name: string | null
  login: string | null
  email: string | null
  phone: string | null
  avatar: string | null
}

export const UserInfoInitial: UserInfo = {
  id: null,
  first_name: null,
  second_name: null,
  display_name: null,
  login: null,
  email: null,
  phone: null,
  avatar: null
}

export interface FetchUserInfoAction {
  type: ActionTypes.fetchUserInfo
  payload: UserInfo
}

export interface SetUserInfoAction {
  type: ActionTypes.setUserInfo
  payload: UserInfo
}

export const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authApi.getUserInfo()
      const userData = JSON.parse(response.response)

      dispatch<FetchUserInfoAction>({
        type: ActionTypes.fetchUserInfo,
        payload: userData
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
