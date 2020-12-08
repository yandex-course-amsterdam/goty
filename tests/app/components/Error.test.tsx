import React from 'react'
import * as renderer from 'react-test-renderer'

import { Error } from 'app/components/Error'

describe('Error component', () => {
  test('Render itself correctly', () => {
    const component = renderer.create(<Error />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use errorText correctly', () => {
    const errorText = 'Oops...'
    const component = renderer.create(<Error errorText={errorText} />).toJSON()
    // eslint-disable-next-line
    // @ts-ignore
    expect(component.children[0]).toEqual(errorText)
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer.create(<Error className="someClass" />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
