import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, Redirect } from 'react-router-dom'

import { authWithYandexOauth } from 'app/api/Api'
import { fetchUserInfo, setOAuthStatus } from 'app/actions'
import { LoaderView } from 'app/views'
import { route } from 'app/enums'

const useQuery = () => new URLSearchParams(useLocation().search)

export const Authorization: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const query = useQuery()
  const codeString = query.get('code')

  const getUserData = async () => {
    try {
      await dispatch(fetchUserInfo())
      setIsLoading(!isLoading)
    } catch (error) {
      console.error(error)
      setIsLoading(!isLoading)
    }
  }

  const signInWithOAuth = async () => {
    try {
      await authWithYandexOauth(codeString)
      await dispatch(fetchUserInfo())
      dispatch(setOAuthStatus(true))
      setIsLoading(!isLoading)
    } catch (error) {
      console.log(error)
      setIsLoading(!isLoading)
    }
  }

  useEffect(() => {
    if (codeString) {
      signInWithOAuth()
    } else {
      getUserData()
    }
  }, [])

  return isLoading ? <LoaderView /> : <Redirect to={route.game} />
}
