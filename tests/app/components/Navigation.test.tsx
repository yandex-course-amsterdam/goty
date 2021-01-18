import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'

import { Navigation } from 'app/components/Navigation'

import { renderWithRouter } from '../../utils'

interface IUserInfo {
  login: string | null
}

const initialState: Record<string, IUserInfo> = {
  userInfo: {
    login: 'Oh hi'
  }
}
const mockStore = configureStore()
const store = mockStore(initialState)

describe('Navigation component', () => {
  test('Render itself correctly', () => {
    const history = createMemoryHistory()
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <Navigation />
          </Provider>,
          history
        )
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
