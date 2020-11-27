import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SignUpView, SignInView, ProfileView, GameView, ScoreView } from 'app/views'

import 'normalize.css'
import './fonts/fonts.css'

export const Main = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <SignUpView />
        </Route>
        <Route path="/sign-in">
          <SignInView />
        </Route>
        <Route path="/profile">
          <ProfileView />
        </Route>
        <Route path="/game">
          <GameView />
        </Route>
        <Route path="/score">
          <ScoreView />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
