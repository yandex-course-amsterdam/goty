import React from 'react'
import * as renderer from 'react-test-renderer'

import { Button } from 'app/components/Button'

describe('Button component', () => {
  test('Render buttonText correctly', () => {
    const buttonText = 'ohHi'
    const component = renderer
      .create(<Button buttonText={buttonText} />)
      .toJSON()
    // eslint-disable-next-line
    // @ts-ignore
    expect(component.children[0]).toEqual(buttonText)
    expect(component).toMatchSnapshot()
  })

  test('Use default type "button" if no type is provided', () => {
    const component = renderer.create(<Button buttonText="Oh hi" />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use specified type when it is provided', () => {
    const component = renderer
      .create(<Button type="submit" buttonText="Oh hi" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(<Button buttonText="Oh hi" className="someClass" />)
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use handleClick prop', () => {
    const foo = () => {
      // hack for eslint empty functions rule
    }
    const component = renderer
      .create(<Button buttonText="Oh hi" handleClick={foo} />)
      .toJSON()
    // eslint-disable-next-line
    // @ts-ignore
    expect(component.props.onClick).toEqual(foo)
    expect(component).toMatchSnapshot()
  })
})
