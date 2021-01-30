import { AxiosResponse } from 'axios'

import { api } from './index'

enum RequestRoot {
  createToken = '/createToken',
  invalidateToken = '/invalidateToken'
}

const baseURL = '/auth'

export const createToken = (userLogin: string): Promise<AxiosResponse> =>
  api.post(RequestRoot.createToken, { userLogin }, { baseURL })

export const invalidateToken = (): Promise<AxiosResponse> =>
  api.post(RequestRoot.invalidateToken, {}, { baseURL })
