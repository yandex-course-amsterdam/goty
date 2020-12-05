import React from 'react'
import * as renderer from 'react-test-renderer'

import { Sidebar } from 'app/components/Sidebar'

describe('Sidebar component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<Sidebar />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer.create(<Sidebar>1</Sidebar>).toJSON()
    expect(component).toMatchSnapshot()
  })
})
