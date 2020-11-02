import { PromiseInterface } from 'app/interfaces/promise'

import { Api } from './Api'

export class AuthApi {
  constructor(private readonly api: Api) {
    this.api = api
  }

  signUp(body: string): Promise<PromiseInterface> {
    return this.api.post('/auth/signup', body)
  }

  signIn(body: string): Promise<PromiseInterface> {
    return this.api.post('/auth/signin', body)
  }

  getUserInfo(): Promise<PromiseInterface> {
    return this.api.get('/auth/user')
  }

  logout(): Promise<PromiseInterface> {
    return this.api.post('/auth/logout', undefined)
  }
}
