import React, { FC, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { PrivateRoute, Authorization } from 'app/components'
import {
  SignUpView,
  SignInView,
  ProfileView,
  GameView,
  ScoreView,
  LoaderView,
  NotFoundView
} from 'app/views'

import { store } from 'app/store'
import { route } from 'app/enums'

// import { startServiceWorker } from 'app/utils'

import 'normalize.css'
import './fonts/fonts.css'
import { fetchUserInfo } from 'app/actions'

// startServiceWorker()

export const Main: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    getUserData()
  }, [])

  return isLoading ? (
    <LoaderView />
  ) : (
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
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
)
