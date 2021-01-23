import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Switch, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

import {
  SignUpView,
  SignInView,
  ProfileView,
  GameView,
  ScoreView,
  NotFoundView
} from 'app/views'
import { OfflineBar, PrivateRoute, Authorization } from 'app/components'

import { postResult, getUserTheme } from 'app/api/Api'
import { fetchUserInfo } from 'app/actions'

import { StoreState } from 'app/reducers'
import { route } from 'app/enums'
import {
  getScore,
  removeScore,
  isServer,
  setUserTheme,
  storeUserTheme
} from 'app/utils'

import 'normalize.css'
import 'assets/main.css'
import '../../../fonts/fonts.css'

// startServiceWorker()

export const App: FC = (): JSX.Element => {
  const [isOffline, setIsOffline] = useState(isServer || !navigator.onLine)

  const dispatch = useDispatch()

  const loginStatus = useSelector(
    (state: StoreState) => state.loginStatus.status
  )

  const handleOfflineCallback = useCallback(() => setIsOffline(true), [])
  const handleOnlineCallback = useCallback(() => {
    setIsOffline(false)

    const storedScore = getScore()

    if (storedScore) {
      postResult(storedScore)
      removeScore()
    }
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await dispatch(fetchUserInfo())
        // Очередной странный тайпинг, учитывая возвращаемое по факту значение
        // Сейчас уже нет времени разбираться, буду потом сильнее вникать в ts
        // @ts-ignore
        const { data: theme } = await getUserTheme(data.id)
        setUserTheme(theme)
        storeUserTheme(theme)
      } catch (error) {
        console.warn(error)
      }
    }

    if (loginStatus) {
      fetchUser()
    }

    if (!isServer) {
      window.addEventListener('offline', handleOfflineCallback)
      window.addEventListener('online', handleOnlineCallback)
    }

    return () => {
      if (!isServer) {
        window.removeEventListener('offline', handleOfflineCallback)
        window.removeEventListener('online', handleOnlineCallback)
      }
    }
  }, [])

  return (
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
