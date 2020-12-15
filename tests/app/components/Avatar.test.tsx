import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore, { MockStore } from 'redux-mock-store'

import { Avatar } from 'app/components/Avatar'

interface IUserInfo {
  avatar: string | null
}

const initialState: Record<string, IUserInfo> = {
  userInfo: {
    avatar: 'boobies.png'
  }
}
const mockStore = configureStore()
let store: MockStore

describe('Avatar component', () => {
  test('Use avatar if provided', () => {
    store = mockStore(initialState)
    const component = renderer
      .create(
        <Provider store={store}>
          <Avatar />
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use default image if no avatar is provided', () => {
    initialState.userInfo.avatar = null
    store = mockStore(initialState)
    const component = renderer
      .create(
        <Provider store={store}>
          <Avatar />
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    store = mockStore(initialState)
    const component = renderer
      .create(
        <Provider store={store}>
          <Avatar className="someClass" />
        </Provider>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
