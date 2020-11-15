type DataStatusAction = {
  type: string
  payload: string
}

export const dataStatusReducer = (
  state = 'pending',
  action: DataStatusAction
): string => {
  switch (action.type) {
    case 'SET_DATA_STATUS':
      return action.payload
    default:
      return state
  }
}
