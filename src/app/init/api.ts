import { Api, AuthApi } from 'app/api'

const api = new Api('https://ya-praktikum.tech/api/v2')

export const authApi = new AuthApi(api)
