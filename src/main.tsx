import React, { FC, useEffect, useState } from 'react'
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
import { route } from 'app/enums'
import { startServiceWorker } from 'app/utils'

import 'normalize.css'
import './fonts/fonts.css'

startServiceWorker()

export const Main: FC = (): JSX.Element => {
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
        <Route path={route.signUp}>
          <SignUpView />
        </Route>
        <Route path={route.signIn}>
          <SignInView />
        </Route>
        <PrivateRoute path={route.profile}>
          <ProfileView />
        </PrivateRoute>
        <PrivateRoute exact path={route.game}>
          <GameView />
        </PrivateRoute>
        <PrivateRoute path={route.score}>
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
