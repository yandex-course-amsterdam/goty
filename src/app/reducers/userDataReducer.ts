import { ACTION_TYPE } from 'app/constants'

export type UserDataState = {
  id: number | null
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar: string
}

type UserDataAction = {
  type: string
  payload: UserDataState
}

export const initialState = {
  id: null,
  first_name: '',
  second_name: '',
  display_name: '',
  login: '',
  email: '',
  phone: '',
  avatar: ''
}

export const userDataReducer = (
  state: UserDataState = initialState,
  action: UserDataAction
): UserDataState => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER_DATA:
      return { ...state, ...action.payload }
    case ACTION_TYPE.FETCH_USER_DATA:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
