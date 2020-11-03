import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'normalize.css'

import './fonts/fonts.css'

import { SignUpView } from 'app/views'

export const Main = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUpView />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
