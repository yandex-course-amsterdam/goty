import { FetchUserInfoAction, SetUserInfoAction } from 'app/actions/userInfo'

export enum ActionTypes {
  fetchUserInfo,
  setUserInfo
}

export type Action = FetchUserInfoAction | SetUserInfoAction
