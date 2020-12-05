import React from 'react'
import * as renderer from 'react-test-renderer'

import { Navigation } from 'app/components/Navigation'

describe('Navigation component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<Navigation />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer.create(<Navigation>1</Navigation>).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render title correctly', () => {
    const component = renderer.create(<Navigation title="Oh hi" />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render title and children combined correctly', () => {
    const component = renderer
      .create(<Navigation title="Oh hi">1</Navigation>)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
