import { UserInfoDTO, UserInfo } from './types'

export const transformToDTO = (info: UserInfo): UserInfoDTO => ({
  id: info.id,
  first_name: info.firstName,
  second_name: info.secondName,
  display_name: info.displayName,
  login: info.login,
  email: info.email,
  phone: info.phone,
  avatar: info.avatar,
  password: info.password
})

export const transformFromDTO = (info: UserInfoDTO): UserInfo => ({
  id: info.id,
  firstName: info.first_name,
  secondName: info.second_name,
  displayName: info.display_name,
  login: info.login,
  email: info.email,
  phone: info.phone,
  avatar: info.avatar,
  password: info.password
})

export const normalizeUserInfo = (info: UserInfo): UserInfo => ({
  id: info.id,
  firstName: info.firstName || '',
  secondName: info.secondName || '',
  displayName: info.displayName || '',
  login: info.login || '',
  email: info.email || '',
  phone: info.phone || '',
  avatar: info.avatar || ''
})
