import { ACTION_TYPES } from 'app/constants'

type UserData = {
  id: number | null
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
}

type UserDataAction = {
  type: string
  payload: UserData
}

export const setUserData = (userData: UserData): UserDataAction => {
  return {
    type: ACTION_TYPES.SET_USER_DATA,
    payload: userData
  }
}
