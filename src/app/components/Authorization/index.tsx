import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'

import { authWithYandexOauth } from 'app/api/Api'
import { fetchUserInfo, setOAuthStatus } from 'app/actions'
import { route } from 'app/enums'

const useQuery = () => new URLSearchParams(useLocation().search)

export const Authorization: FC = (): null => {
  const dispatch = useDispatch()
  const history = useHistory()

  const query = useQuery()
  const codeString = query.get('code')

  const getUserData = async () => {
    try {
      await dispatch(fetchUserInfo())
    } catch (error) {
      console.error(error)
    }

    history.push(route.game)
  }

  const signInWithOAuth = async () => {
    try {
      await authWithYandexOauth(codeString)
      await dispatch(fetchUserInfo(true))
      dispatch(setOAuthStatus(true))
    } catch (error) {
      console.log(error)
    }

    history.push(route.game)
  }

  useEffect(() => {
    if (codeString) {
      signInWithOAuth()
    } else {
      getUserData()
    }
  }, [])

  return null
}
