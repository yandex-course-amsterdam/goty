import React from 'react'
import * as renderer from 'react-test-renderer'
import { createMemoryHistory } from 'history'

import { ListItem } from 'uikit/Navigation/Item'

import { renderWithRouter } from '../../utils'

const history = createMemoryHistory()

describe('List item component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(renderWithRouter(<ListItem text="Oh hi" />, history))
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <ListItem text="Oh hi" className="someClass" />,
          history
        )
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
