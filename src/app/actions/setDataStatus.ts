type LoadStatus = 'success' | 'pending' | 'failed'

type DataStatusAction = {
  type: string
  payload: LoadStatus
}

export const setDataStatus = (status: LoadStatus): DataStatusAction => {
  return {
    type: 'SET_DATA_STATUS',
    payload: status
  }
}
