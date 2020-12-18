import React, { FC, useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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

import { store } from 'app/store'
import { route } from 'app/enums'

import { startServiceWorker } from 'app/utils'

import 'normalize.css'
import './fonts/fonts.css'
import { fetchUserInfo } from 'app/actions'

startServiceWorker()

export const Main: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
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
  const handleOnlineCallback = useCallback(() => setIsOffline(false), [])

  window.addEventListener('offline', handleOfflineCallback)
  window.addEventListener('online', handleOnlineCallback)

  useEffect(() => {
    getUserData()

    return () => {
      window.removeEventListener('offline', handleOfflineCallback)
      window.removeEventListener('online', handleOnlineCallback)
    }
  }, [])

  return isLoading ? (
    <LoaderView />
  ) : (
    <>
      <Router>
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
      </Router>

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

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.querySelector('#root')
)
