import { Dispatch } from 'redux'
import { authApi } from 'app/api'

import { ACTION_TYPE } from 'app/constants'

export const fetchUserData = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.getUserInfo()
    const userData = JSON.parse(response.response)

    dispatch({
      type: ACTION_TYPE.FETCH_USER_DATA,
      payload: userData
    })
  } catch (error) {
    console.log(error)
  }
}
