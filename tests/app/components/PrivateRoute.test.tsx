import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore, { MockStore } from 'redux-mock-store'

import { BrowserRouter as Router } from 'react-router-dom'

import { PrivateRoute } from 'app/components/PrivateRoute'

interface IUserInfo {
  login: string | null
}

const initialState: Record<string, IUserInfo> = {
  userInfo: {
    login: 'Oh hi'
  }
}
const mockStore = configureStore()
let store: MockStore

describe('PrivateRoute component', () => {
  test('Render route', () => {
    store = mockStore(initialState)
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <PrivateRoute path="/">1</PrivateRoute>
        </Router>
      </Provider>
    )
    // Snapshot equals to children in this case ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })

  test('Render redirect', () => {
    initialState.userInfo.login = null
    store = mockStore(initialState)
    const component = renderer
      .create(
        <Provider store={store}>
          <Router>
            <PrivateRoute path="/" exact>
              1
            </PrivateRoute>
          </Router>
        </Provider>
      )
      .toJSON()
    // Snapshot equals to null in this case ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })
})
