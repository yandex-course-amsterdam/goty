import { ACTION_TYPES } from 'app/constants'

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

const initialState = {
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
  if (action.type === ACTION_TYPES.SET_USER_DATA) {
    return { ...state, ...action.payload }
  }

  return state
}
