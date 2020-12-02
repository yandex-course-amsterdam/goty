import { Dispatch } from 'redux'

import { ActionTypes } from 'app/actions'
import { getUserInfo } from 'app/api/Api'

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
      const { data } = await getUserInfo()

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
