import React from 'react'
import * as renderer from 'react-test-renderer'

import { ErrorBoundary } from 'app/components/'
import { Button } from 'app/components/Button'
import { Throwable } from './mockComponents/Throwable'

describe('Error component', () => {
  test('Render children when there are no errors', () => {
    const component = renderer
      .create(
        <ErrorBoundary>
          <Button buttonText="Oh hi" />
        </ErrorBoundary>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render fallback UI when there is an error', () => {
    const component = renderer
      .create(
        <ErrorBoundary>
          <Throwable />
        </ErrorBoundary>
      )
      .toJSON()
    expect(component).toMatchSnapshot()
  })
})
