import React from 'react'
import * as renderer from 'react-test-renderer'
import { createMemoryHistory } from 'history'

import { SubNavigation } from 'app/components/SubNavigation'

import { renderWithRouter } from '../../utils/index'

const history = createMemoryHistory()

describe('SubNavigation component', () => {
  test('Render itself correctly', () => {
    const component = renderer
      .create(renderWithRouter(<SubNavigation />, history))
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render children correctly', () => {
    const component = renderer
      .create(renderWithRouter(<SubNavigation>1</SubNavigation>, history))
      .toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render title correctly', () => {
    const component = renderer
      .create(renderWithRouter(<SubNavigation title="Oh hi" />, history))
      .toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })

  test('Render title and children combined correctly', () => {
    const component = renderer
      .create(
        renderWithRouter(
          <SubNavigation title="Oh hi">1</SubNavigation>,
          history
        )
      )
      .toJSON()
    // React.Fragment treated as Array in snapshots
    expect(component).toMatchSnapshot()
  })
})
