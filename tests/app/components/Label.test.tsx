import React from 'react'
import * as renderer from 'react-test-renderer'

import { Label } from 'app/components/Label'

describe('Label component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(<Label id="foo" labelText="bar" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(<Label id="foo" labelText="bar" className="someClass" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
