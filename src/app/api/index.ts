import { UserApi } from './UsersApi'
import { Api } from './Api'
import { AuthApi } from './AuthApi'

export { RequestRoot, RequestMethod, ContentType } from './enums'
export { IOptions, IApiResponse, IApi, IUserApi } from './interfaces'

const api = new Api('https://ya-praktikum.tech/api/v2')

export const authApi = new AuthApi(api)
export const userApi = new UserApi(api)
