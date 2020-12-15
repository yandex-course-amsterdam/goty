import { FetchUserInfoAction, SetUserInfoAction } from 'app/actions'

export enum ActionTypes {
  fetchUserInfo,
  setUserInfo
}

export type Action = FetchUserInfoAction | SetUserInfoAction
