import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'

import { SubNavigation } from 'app/components/SubNavigation'

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
const store = mockStore(initialState)

describe('SubNavigation component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <SubNavigation />
          </Provider>,
          history
        )
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <SubNavigation>1</SubNavigation>
          </Provider>,
          history
        )
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render title correctly', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <SubNavigation title="Oh hi" />
          </Provider>,
          history
        )
      )
      .toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })

  test('Render title and children combined correctly', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <SubNavigation title="Oh hi">1</SubNavigation>
          </Provider>,
          history
        )
      )
      .toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })
})
