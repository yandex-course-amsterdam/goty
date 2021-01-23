import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'

import { ExitButton } from 'app/components/ExitButton'

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

// eslint-disable-next-line
// @ts-ignore
jest.spyOn(React, 'useState').mockImplementationOnce(() => [false])

describe('Exit button component', () => {
  test('Render redirect if user is not logged in', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <Provider store={store}>
            <ExitButton>Oops</ExitButton>
          </Provider>,
          history
        )
      )
      .toJSON()
    // Snapshot equals to null when there are no parent container for element rendered directly inside Router component
    // Сompare to Navigation component snapshots for example
    // ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })

  test('Render default markup if user is logged in', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <ExitButton>Oops</ExitButton>
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <ExitButton className="someClass">Oops</ExitButton>
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
