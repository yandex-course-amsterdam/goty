import React from 'react'
import * as renderer from 'react-test-renderer'

import { List } from 'uikit/Navigation/List'

describe('List component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<List />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer.create(<List>1</List>).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer.create(<List className="someClass" />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
