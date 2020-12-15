import React from 'react'
import * as renderer from 'react-test-renderer'

import { Description } from 'app/components/Description'

describe('Description component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(<Description title="Oh hi" subtitle="Mark" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(
        <Description title="Oh hi" subtitle="Mark" className="someClass" />
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
