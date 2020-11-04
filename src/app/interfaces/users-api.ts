import { PromiseInterface } from './promise'

export interface UsersApiInterface {
  updateProfile(body: string): Promise<PromiseInterface>
  updatePass(body: string): Promise<PromiseInterface>
  updateAvatar(body: FormData): Promise<PromiseInterface>
}
