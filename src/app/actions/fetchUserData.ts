import { Dispatch } from 'redux'
import { authApi } from 'app/api'

import { ACTION_TYPES } from 'app/constants'

export const fetchUserData = () => async (dispatch: Dispatch) => {
  const response = await authApi.getUserInfo()
  const userData = JSON.parse(response.response)

  dispatch({
    type: ACTION_TYPES.FETCH_USER_DATA,
    payload: userData
  })
}
