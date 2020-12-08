import React from 'react'
import * as renderer from 'react-test-renderer'

import { Title } from 'app/components/Title'

describe('Title component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<Title title="Oh hi" />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(<Title title="Oh hi" className="someClass" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
