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
  avatar = '/user/profile/avatar',
  serviceId = '/oauth/yandex/service-id',
  oauth = '/oauth/yandex',
  storeResult = '/leaderboard',
  getLeaderboard = '/leaderboard/all'
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

export const getServiceId = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.serviceId)

export const authWithYandexOauth = (
  codeString: string | null
): Promise<AxiosResponse> => api.post(RequestRoot.oauth, { code: codeString })

export const postResult = (body: Record<string, any>): Promise<AxiosResponse> =>
  api.post(RequestRoot.storeResult, body)

export const getLeaderboard = (limit = 10): Promise<AxiosResponse> => {
  const body = {
    ratingFieldName: 'amsterdamScore',
    cursor: 0,
    limit
  }

  return api.post(RequestRoot.getLeaderboard, body)
}

export const createToken = (userLogin: string): Promise<AxiosResponse> =>
  api.post('/createToken', { userLogin }, { baseURL: '/auth' })

export const invalidateToken = (): Promise<AxiosResponse> =>
  api.post('/invalidateToken', {}, { baseURL: '/auth' })

// TODO: разнести по модулям
/**
 * Mongo-ручки
 */

export const sendFeedback = (body: FormikValues): Promise<AxiosResponse> =>
  api.post('/feedback', body, { baseURL: '/' })

/**
 * PostgreSQL-ручки
 */
export const getUserTheme = (userId: number): Promise<AxiosResponse> =>
  api.get('/getTheme', { params: { userId }, baseURL: '/users' })

export const setTheme = (
  userId: number,
  themeId: number
): Promise<AxiosResponse> =>
  api.post('/setTheme', { userId, themeId }, { baseURL: '/users' })

export const getAllThemes = (): Promise<AxiosResponse> =>
  api.get('/all', { baseURL: '/themes' })

/**
 * Ручки ниже «открыты» для пользования, но не представлены в приложении
 * Можно использовать их для заведения тем новых тем, апдейта текущих, etc.
 */

export const postTheme = (
  name: string,
  baseColor: string
): Promise<AxiosResponse> =>
  api.post('/', { name, baseColor }, { baseURL: '/themes' })

export const getTheme = (id: number): Promise<AxiosResponse> =>
  api.get('/', { params: { id }, baseURL: '/themes' })

export const updateTheme = (
  id: number,
  baseColor: string
): Promise<AxiosResponse> =>
  api.put('/', { baseColor }, { params: { id }, baseURL: '/themes' })

export const deleteTheme = (
  userId: number,
  themeId: number
): Promise<AxiosResponse> =>
  api.delete('/', { params: { userId, themeId }, baseURL: '/themes' })
