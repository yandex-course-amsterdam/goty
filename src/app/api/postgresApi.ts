import { AxiosResponse } from 'axios'

import { JSONReponseTheme, JSONReponseThemeArr } from 'shared'
import { UserInfoDTO } from 'app/actions'

import { api } from './index'

const baseURLUsers = '/user'
const baseURLThemes = '/theme'
const baseURLNews = '/news'
const baseURLComment = '/comment'
const baseURLLike = '/like'

/**
 * Юзер
 */

export const setUser = (body: UserInfoDTO): Promise<AxiosResponse> =>
  api.post('/', body, { baseURL: baseURLUsers })

/**
 * Темизация
 */
export const getUserTheme = (
  userId: number
): Promise<AxiosResponse<JSONReponseTheme>> =>
  api.get(`/${userId}/theme`, { baseURL: baseURLUsers })

export const setTheme = (
  userId: number,
  themeId: number
): Promise<AxiosResponse> =>
  api.post('/theme', { userId, themeId }, { baseURL: baseURLUsers })

export const getAllThemes = (): Promise<AxiosResponse<JSONReponseThemeArr>> =>
  api.get('/', { baseURL: baseURLThemes })

/**
 * Фид
 */
export const getAllNews = (): Promise<AxiosResponse> =>
  api.get('/', { baseURL: baseURLNews })

export const postComment = (
  newsId: number,
  text: string,
  userId: number
): Promise<AxiosResponse> =>
  api.post('/', { newsId, text, userId }, { baseURL: baseURLComment })

export const deleteComment = (commentId: number): Promise<AxiosResponse> =>
  api.delete(`/${commentId}`, { baseURL: baseURLComment })

export const postLike = (
  newsId: number,
  type: string,
  userId: number
): Promise<AxiosResponse> =>
  api.post('/', { newsId, type, userId }, { baseURL: baseURLLike })

/**
 * Ручки ниже «открыты» для пользования, но не представлены в приложении
 * Можно использовать их для заведения тем новых тем, апдейта текущих, etc.
 */

export const createTheme = (
  name: string,
  baseColor: string
): Promise<AxiosResponse> =>
  api.post('/', { name, baseColor }, { baseURL: baseURLThemes })

export const getTheme = (
  id: number
): Promise<AxiosResponse<JSONReponseTheme>> =>
  api.get(`/${id}`, { baseURL: baseURLThemes })

export const updateTheme = (
  id: number,
  baseColor: string
): Promise<AxiosResponse> =>
  api.put(`/${id}`, { baseColor }, { baseURL: baseURLThemes })
