import { UsersApi } from 'app/api/UsersApi'
import { Api } from './Api'
import { AuthApi } from './AuthApi'

const api = new Api('https://ya-praktikum.tech/api/v2')

export const authApi = new AuthApi(api)
export const userApi = new UsersApi(api)
