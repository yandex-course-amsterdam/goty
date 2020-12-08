import React from 'react'
import * as renderer from 'react-test-renderer'
import { createMemoryHistory } from 'history'

import { Navigation } from 'app/components/Navigation'

import { renderWithRouter } from '../../utils'

describe('Navigation component', () => {
  test('Render itself correctly', () => {
    const history = createMemoryHistory()
    const component = renderer
      .create(renderWithRouter(<Navigation />, history))
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
