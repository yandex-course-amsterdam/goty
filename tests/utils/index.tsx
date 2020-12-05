import React from 'react'
import { MemoryHistory } from 'history'
import { Router, Route } from 'react-router-dom'

export const renderWithRouter = (
  component: JSX.Element,
  history: MemoryHistory
): JSX.Element => {
  return (
    <Router history={history}>
      <Route path="/">{component}</Route>
    </Router>
  )
}
