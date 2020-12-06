import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore, { MockStore } from 'redux-mock-store'
import { createMemoryHistory } from 'history'

import { PrivateRoute } from 'app/components/PrivateRoute'

import { renderWithRouter } from '../../utils'

const history = createMemoryHistory()

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
        {renderWithRouter(<PrivateRoute path="/">1</PrivateRoute>, history)}
      </Provider>
    )
    // Snapshot equals to null when there are no parent container for element rendered directly inside Router component
    // Сompare to Navigation component snapshots for example
    // ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })

  test('Render redirect', () => {
    initialState.userInfo.login = null
    store = mockStore(initialState)
    const component = renderer
      .create(
        <Provider store={store}>
          {renderWithRouter(
            <PrivateRoute path="/" exact>
              1
            </PrivateRoute>,
            history
          )}
        </Provider>
      )
      .toJSON()
    // Snapshot equals to null when there are no parent container for element rendered directly inside Router component
    // Сompare to Navigation component snapshots for example
    // ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })
})
