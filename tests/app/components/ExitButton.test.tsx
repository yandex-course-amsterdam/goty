import React from 'react'
import * as renderer from 'react-test-renderer'

import { BrowserRouter as Router } from 'react-router-dom'

import { ExitButton } from 'app/components/ExitButton'

// eslint-disable-next-line
// @ts-ignore
jest.spyOn(React, 'useState').mockImplementationOnce(() => [false])

describe('Exit button component', () => {
  test('Render redirect if user is not logged in', () => {
    const component = renderer
      .create(
        <Router>
          <ExitButton>Oops</ExitButton>
        </Router>
      )
      .toJSON()
    // Snapshot equals to null in this case ¯\_(ツ)_/¯
    expect(component).toMatchSnapshot()
  })

  test('Render default markup if user is logged in', () => {
    const component = renderer.create(<ExitButton>Oops</ExitButton>).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Use className prop', () => {
    const component = renderer
      .create(<ExitButton className="someClass">Oops</ExitButton>)
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
