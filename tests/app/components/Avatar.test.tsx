import React from 'react'
import * as renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { Avatar } from 'app/components/Avatar'

let store

test('Link changes the class when hovered', () => {
  const initialState = {
    userInfo: {
      avatar: 'https://static.insider.com/image/5d24d6b921a861093e71fef3.jpg'
    }
  }
  const mockStore = configureStore()
  store = mockStore(initialState)
  const component = renderer.create(
    <Provider store={store}>
      <Avatar />
    </Provider>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
