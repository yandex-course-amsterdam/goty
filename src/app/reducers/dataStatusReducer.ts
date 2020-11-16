import { ACTION_TYPES } from 'app/constants'

type DataStatusAction = {
  type: string
  payload: string
}

export const dataStatusReducer = (
  state = 'pending',
  action: DataStatusAction
): string => {
  if (action.type === ACTION_TYPES.SET_DATA_STATUS) {
    return action.payload
  }

  return state
}
