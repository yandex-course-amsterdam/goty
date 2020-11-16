import { ACTION_TYPES } from 'app/constants'

type LoadStatus = 'success' | 'pending' | 'failed'

type DataStatusAction = {
  type: string
  payload: LoadStatus
}

export const setDataStatus = (status: LoadStatus): DataStatusAction => {
  return {
    type: ACTION_TYPES.SET_DATA_STATUS,
    payload: status
  }
}
