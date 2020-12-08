import React from 'react'
import * as renderer from 'react-test-renderer'

import { Main } from 'app/components/Main'
import { Throwable } from './mockComponents/Throwable'

describe('Main component', () => {
  test('Render children correctly', () => {
    const component = renderer.create(<Main>1</Main>).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render throwable children correctly', () => {
    const component = renderer
      .create(
        <Main>
          <Throwable />
        </Main>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
