import { AxiosResponse } from 'axios'

import { UserInfo } from '../actions/types'

import { api } from './index'

enum RequestRoot {
  getTheme = '/getTheme',
  setTheme = '/setTheme',
  all = '/all'
}

const baseURLUsers = '/users'
const baseURLThemes = '/themes'
const baseURLNews = '/news'
const baseURLComment = '/comments'
const baseURLLike = '/likes'

/**
 * Юзер
 */

export const setUser = (body: UserInfo): Promise<AxiosResponse> =>
  api.post('/', body, { baseURL: baseURLUsers })

/**
 * Темизация
 */
export const getUserTheme = (userId: number): Promise<AxiosResponse> =>
  api.get(RequestRoot.getTheme, { params: { userId }, baseURL: baseURLUsers })

export const setTheme = (
  userId: number,
  themeId: number
): Promise<AxiosResponse> =>
  api.post(RequestRoot.setTheme, { userId, themeId }, { baseURL: baseURLUsers })

export const getAllThemes = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.all, { baseURL: baseURLThemes })

/**
 * Фид
 */
export const getAllNews = (): Promise<AxiosResponse> =>
  api.get(RequestRoot.all, { baseURL: baseURLNews })

export const postComment = (
  newsId: number,
  text: string,
  userId: number
): Promise<AxiosResponse> =>
  api.post('/', { newsId, text, userId }, { baseURL: baseURLComment })

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

export const postTheme = (
  name: string,
  baseColor: string
): Promise<AxiosResponse> =>
  api.post('/', { name, baseColor }, { baseURL: baseURLThemes })

export const getTheme = (id: number): Promise<AxiosResponse> =>
  api.get('/', { params: { id }, baseURL: baseURLThemes })

export const updateTheme = (
  id: number,
  baseColor: string
): Promise<AxiosResponse> =>
  api.put('/', { baseColor }, { params: { id }, baseURL: baseURLThemes })

export const deleteTheme = (
  userId: number,
  themeId: number
): Promise<AxiosResponse> =>
  api.delete('/', { params: { userId, themeId }, baseURL: baseURLThemes })
