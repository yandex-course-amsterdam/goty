import React, { ReactElement, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from 'app/components'
import {
  SignUpView,
  SignInView,
  ProfileView,
  GameView,
  ScoreView,
  LoaderView
} from 'app/views'

import { authApi } from 'app/api'
import { store } from 'app/store'
import { setUserInfo } from 'app/actions'
import { ROUTE } from 'app/constants'

import 'normalize.css'
import './fonts/fonts.css'

export const Main = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      const res = await authApi.getUserInfo()

      if (res.status === 200) {
        const user = JSON.parse(res.response)
        dispatch(setUserInfo(user))
      }

      setIsLoading(false)
    } catch (error) {
      throw new Error(error)
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
        <Route path={ROUTE.SIGN_UP}>
          <SignUpView />
        </Route>
        <Route path={ROUTE.SIGN_IN}>
          <SignInView />
        </Route>
        <PrivateRoute path={ROUTE.PROFILE}>
          <ProfileView />
        </PrivateRoute>
        <PrivateRoute exact path={ROUTE.GAME}>
          <GameView />
        </PrivateRoute>
        <PrivateRoute path={ROUTE.SCORE}>
          <ScoreView />
        </PrivateRoute>
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
