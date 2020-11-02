import { PromiseInterface } from 'app/interfaces/promise'

import { UsersApiInterface } from 'app/interfaces/users-api'

import { Api } from './Api'

export class UsersApi implements UsersApiInterface {
  constructor(private readonly api: Api) {
    this.api = api
  }

  updateProfile(body: string): Promise<PromiseInterface> {
    return this.api.put('/user/profile', body, null)
  }

  updatePass(body: string): Promise<PromiseInterface> {
    return this.api.put('/user/password', body, null)
  }

  updateAvatar(body: FormData): Promise<PromiseInterface> {
    return this.api.put('/user/profile/avatar', body, 'multipart/form-data')
  }
}
