import React from 'react'
import * as renderer from 'react-test-renderer'

import { UserScore } from 'app/components/UserScore'

describe('UserScore component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(<UserScore score={42} name="Mark" width="21" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
