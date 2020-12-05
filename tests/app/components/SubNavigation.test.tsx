import React from 'react'
import * as renderer from 'react-test-renderer'

import { SubNavigation } from 'app/components/SubNavigation'

describe('SubNavigation component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<SubNavigation />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer.create(<SubNavigation>1</SubNavigation>).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render title correctly', () => {
    const component = renderer.create(<SubNavigation title="Oh hi" />).toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })

  test('Render title and children combined correctly', () => {
    const component = renderer
      .create(<SubNavigation title="Oh hi">1</SubNavigation>)
      .toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })
})
