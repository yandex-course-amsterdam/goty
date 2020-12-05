import React from 'react'
import * as renderer from 'react-test-renderer'

import { ErrorBoundary } from 'app/components/ErrorBoundary'
import { Button } from 'app/components/Button'

describe('Error component', () => {
  test('Render children when there are no errors', () => {
    const component = renderer
      .create(
        <ErrorBoundary>
          <Button buttonText="Oh hi" />
        </ErrorBoundary>
      )
      .toJSON()
    console.log(component)
    expect(component).toMatchSnapshot()
  })
})
