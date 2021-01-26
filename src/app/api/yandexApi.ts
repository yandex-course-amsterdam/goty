import { AxiosResponse } from 'axios'
import { FormikValues } from 'formik'

import { api } from './index'

enum RequestRoot {
  signUp = '/auth/signup',
  signIn = '/auth/signin',
  userInfo = '/auth/user',
  logout = '/auth/logout',
  profile = '/user/profile',
  password = '/user/password',
  avatar = '/user/profile/avatar',
  serviceId = '/oauth/yandex/service-id',
  oauth = '/oauth/yandex',
  storeResult = '/leaderboard',
  getLeaderboard = '/leaderboard/all'
}

const baseURL = 'https://ya-praktikum.tech/api/v2'

export const getUserInfo = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.userInfo, { baseURL })

export const signIn = (body: FormikValues): Promise<AxiosResponse> =>
  api.post(RequestRoot.signIn, body, { baseURL })

export const signUp = (body: FormikValues): Promise<AxiosResponse> =>
  api.post(RequestRoot.signUp, body, { baseURL })

export const updatePassword = (body: FormikValues): Promise<AxiosResponse> =>
  api.put(RequestRoot.password, body, { baseURL })

export const updateProfile = (body: FormikValues): Promise<AxiosResponse> =>
  api.put(RequestRoot.profile, body, { baseURL })

export const updateAvatar = (body: FormData): Promise<AxiosResponse> =>
  api.put(RequestRoot.avatar, body, { baseURL })

export const logout = (): Promise<AxiosResponse> =>
  api.post(RequestRoot.logout, {}, { baseURL })

export const getServiceId = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.serviceId, { baseURL })

export const authWithYandexOauth = (
  codeString: string | null
): Promise<AxiosResponse> =>
  api.post(RequestRoot.oauth, { baseURL, code: codeString })

export const postResult = (body: Record<string, any>): Promise<AxiosResponse> =>
  api.post(RequestRoot.storeResult, body, { baseURL })

export const getLeaderboard = (limit = 10): Promise<AxiosResponse> => {
  const body = {
    ratingFieldName: 'amsterdamScore',
    cursor: 0,
    limit
  }

  return api.post(RequestRoot.getLeaderboard, body, { baseURL })
}
