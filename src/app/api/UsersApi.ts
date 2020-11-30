import { IUserApi, IApiResponse, RequestRoot, ContentType } from 'app/api'

import { Api } from './Api'

export class UserApi implements IUserApi {
  constructor(private readonly api: Api) {
    this.api = api
  }

  updateProfile(body: string): Promise<IApiResponse> {
    return this.api.put(RequestRoot.profile, body, ContentType.empty)
  }

  updatePass(body: string): Promise<IApiResponse> {
    return this.api.put(RequestRoot.password, body, ContentType.empty)
  }

  updateAvatar(body: FormData): Promise<IApiResponse> {
    return this.api.put(RequestRoot.avatar, body, ContentType.formData)
  }
}
