import React from 'react'
import * as renderer from 'react-test-renderer'

import { ListItem } from 'app/components/Item'

describe('List item component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<ListItem text="Oh hi" />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(<ListItem text="Oh hi" className="someClass" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
