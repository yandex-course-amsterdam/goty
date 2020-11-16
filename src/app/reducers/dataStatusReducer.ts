import { ACTION_TYPES } from 'app/constants'

type DataStatusAction = {
  type: string
  payload: string
}

export const dataStatusReducer = (
  state = 'pending',
  action: DataStatusAction
): string => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA_STATUS:
      return action.payload
    default:
      return state
  }
}
