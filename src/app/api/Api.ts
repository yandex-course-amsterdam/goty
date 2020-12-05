import axios, { AxiosResponse } from 'axios'
import { FormikValues } from 'formik'

const api = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
  timeout: 10000
})

export enum RequestRoot {
  signUp = '/auth/signup',
  signIn = '/auth/signin',
  userInfo = '/auth/user',
  logout = '/auth/logout',
  profile = '/user/profile',
  password = '/user/password',
  avatar = '/user/profile/avatar'
}

export const getUserInfo = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.userInfo)

export const signIn = (body: FormikValues): Promise<AxiosResponse> =>
  api.post(RequestRoot.signIn, body)

export const signUp = (body: FormikValues): Promise<AxiosResponse> =>
  api.post(RequestRoot.signUp, body)

export const updatePassword = (body: FormikValues): Promise<AxiosResponse> =>
  api.put(RequestRoot.password, body)

export const updateProfile = (body: FormikValues): Promise<AxiosResponse> =>
  api.put(RequestRoot.profile, body)

export const updateAvatar = (body: FormData): Promise<AxiosResponse> =>
  api.put(RequestRoot.avatar, body)

export const logout = (): Promise<AxiosResponse> => api.post(RequestRoot.logout)
