import React from 'react'
import * as renderer from 'react-test-renderer'

import { Loader } from 'app/components/Loader'

describe('Loader component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<Loader />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
