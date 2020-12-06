import React from 'react'
import * as renderer from 'react-test-renderer'
import { createMemoryHistory } from 'history'

import { ExitButton } from 'app/components/ExitButton'

import { renderWithRouter } from '../../utils'

const history = createMemoryHistory()

// eslint-disable-next-line
// @ts-ignore
jest.spyOn(React, 'useState').mockImplementationOnce(() => [false])

describe('Exit button component', () => {
  test('Render redirect if user is not logged in', () => {
    const component = renderer
      .create(renderWithRouter(<ExitButton>Oops</ExitButton>, history))
      .toJSON()
    // Snapshot equals to null when there are no parent container for element rendered directly inside Router component
    // Сompare to Navigation component snapshots for example
    // ¯\_(ツ)_/¯
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
