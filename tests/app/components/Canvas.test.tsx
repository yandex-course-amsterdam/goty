// eslint-disable-next-line
// @ts-nocheck

import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { Canvas } from 'app/components/Canvas'

interface IUserInfo {
  login: string | null
}

const initialState: Record<string, IUserInfo> = {
  userInfo: {
    display_name: 'Johnny'
  }
}
const mockStore = configureStore()
const store = mockStore(initialState)

jest
  .spyOn(React, 'useState')
  .mockImplementationOnce(() => [false])
  .mockImplementationOnce(() => [0])
  .mockImplementationOnce(() => [null])
  .mockImplementationOnce(() => [true])

describe('Canvas component', () => {
  test('Render endgame popup correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Canvas />
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render itself correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <Canvas />
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
