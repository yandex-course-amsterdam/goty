import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { SignUpView } from 'app/views'

import 'normalize.css'
import './fonts/fonts.css'

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
