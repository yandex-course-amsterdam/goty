export enum ActionTypes {
  fetchUserInfo,
  setUserInfo,
  setOAuthStatus,
  setLoginStatus
}

export interface FetchUserInfoAction {
  type: ActionTypes.fetchUserInfo
  payload: UserInfo
}

export interface SetUserInfoAction {
  type: ActionTypes.setUserInfo
  payload: UserInfo
}

export interface SetOAuthStatusAction {
  type: ActionTypes.setOAuthStatus
  payload: boolean
}

export interface SetLoginStatusAction {
  type: ActionTypes.setLoginStatus
  payload: boolean
}

export type Action =
  | FetchUserInfoAction
  | SetUserInfoAction
  | SetOAuthStatusAction
  | SetLoginStatusAction
export interface UserInfoDTO {
  id?: number | null
  first_name: string | null
  second_name: string | null
  display_name?: string | null
  login: string | null
  email: string | null
  phone: string | null
  avatar?: string | null
  password?: string | null
}

export interface UserInfo {
  id?: number | null
  firstName: string | null
  secondName: string | null
  displayName?: string | null
  login: string | null
  email: string | null
  phone: string | null
  avatar?: string | null
  password?: string | null
}

export const UserInfoInitial: UserInfo = {
  id: null,
  firstName: '',
  secondName: '',
  displayName: '',
  login: '',
  email: '',
  phone: '',
  avatar: ''
}

export interface OAuthStatus {
  status: boolean
}

export const OAuthStatusInitial: OAuthStatus = {
  status: false
}

export interface loginStatus {
  status: boolean
}

export const loginStatusInitial: OAuthStatus = {
  status: false
}
