import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
<<<<<<< HEAD
import { SignUpView, SignInView, GameView } from 'app/views'
=======
import { SignUpView, GameView } from 'app/views'
>>>>>>> 8b862b6c99e9bbb4e807b48c837da3fbcead9fe0

import 'normalize.css'
import './fonts/fonts.css'

export const Main = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/sign-up">
          <SignUpView />
        </Route>
<<<<<<< HEAD
        <Route exact path="/sign-in">
          <SignInView />
        </Route>
=======
>>>>>>> 8b862b6c99e9bbb4e807b48c837da3fbcead9fe0
        <Route exact path="/play">
          <GameView />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
