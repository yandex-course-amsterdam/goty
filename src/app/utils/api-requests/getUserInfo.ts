import { authApi } from 'app/api'

import { PromiseInterface } from 'app/interfaces/promise'

export const getUserInfo = (): Promise<PromiseInterface> => {
  return authApi.getUserInfo()
}
