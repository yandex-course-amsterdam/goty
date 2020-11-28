import {
  UsersApiInterface,
  ApiResponse,
  RequestRoot,
  ContentType
} from 'app/api'

import { Api } from './Api'

export class UsersApi implements UsersApiInterface {
  constructor(private readonly api: Api) {
    this.api = api
  }

  updateProfile(body: string): Promise<ApiResponse> {
    return this.api.put(RequestRoot.profile, body, ContentType.empty)
  }

  updatePass(body: string): Promise<ApiResponse> {
    return this.api.put(RequestRoot.password, body, ContentType.empty)
  }

  updateAvatar(body: FormData): Promise<ApiResponse> {
    return this.api.put(RequestRoot.avatar, body, ContentType.formData)
  }
}
