import { ApiResponse, RequestRoot } from 'app/api'

import { Api } from './Api'

export class AuthApi {
  constructor(private readonly api: Api) {
    this.api = api
  }

  signUp(body: string): Promise<ApiResponse> {
    return this.api.post(RequestRoot.signUp, body)
  }

  signIn(body: string): Promise<ApiResponse> {
    return this.api.post(RequestRoot.signIn, body)
  }

  getUserInfo(): Promise<ApiResponse> {
    return this.api.get(RequestRoot.userInfo)
  }

  logout(): Promise<ApiResponse> {
    return this.api.post(RequestRoot.logout, '')
  }
}
