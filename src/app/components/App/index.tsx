import React, { FC, useCallback, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {
  SignUpView,
  SignInView,
  ProfileView,
  GameView,
  ScoreView,
  LoaderView,
  NotFoundView
} from 'app/views'
import { OfflineBar, PrivateRoute, Authorization } from 'app/components'

import { postResult } from 'app/api/Api'

import { route } from 'app/enums'
import { getScore, removeScore, isServer } from 'app/utils'

import 'normalize.css'
import '../../../fonts/fonts.css'
import { fetchUserInfo } from 'app/actions'

// startServiceWorker()

export const App: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(isServer || !navigator.onLine)

  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      await dispatch(fetchUserInfo())
      setIsLoading(!isLoading)
    } catch (error) {
      console.log(error)
      setIsLoading(!isLoading)
    }
  }

  const handleOfflineCallback = useCallback(() => setIsOffline(true), [])
  const handleOnlineCallback = useCallback(() => {
    setIsOffline(false)

    const storedScore = getScore()

    if (storedScore) {
      postResult(storedScore)
      removeScore()
    }
  }, [])

  if (!isServer) {
    window.addEventListener('offline', handleOfflineCallback)
    window.addEventListener('online', handleOnlineCallback)
  }

  useEffect(() => {
    getUserData()

    return () => {
      if (!isServer) {
        window.removeEventListener('offline', handleOfflineCallback)
        window.removeEventListener('online', handleOnlineCallback)
      }
    }
  }, [])

  return isLoading ? (
    <LoaderView />
  ) : (
    <>
      <Switch>
        <Route exact path={route.auth}>
          <Authorization />
        </Route>
        <Route path={route.signUp}>
          <SignUpView />
        </Route>
        <Route path={route.signIn}>
          <SignInView />
        </Route>
        <PrivateRoute path={route.profile}>
          <ProfileView />
        </PrivateRoute>
        <PrivateRoute path={route.game}>
          <GameView />
        </PrivateRoute>
        <PrivateRoute path={route.score}>
          <ScoreView />
        </PrivateRoute>
        <Route path="*">
          <NotFoundView />
        </Route>
      </Switch>

      <CSSTransition
        in={isOffline}
        appear={isOffline}
        timeout={0}
        classNames="bar"
      >
        <OfflineBar />
      </CSSTransition>
    </>
  )
}
