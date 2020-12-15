// eslint-disable-next-line
// @ts-nocheck

import React from 'react'
import * as renderer from 'react-test-renderer'

import { Canvas } from 'app/components/Canvas'

jest
  .spyOn(React, 'useState')
  .mockImplementationOnce(() => [false])
  .mockImplementationOnce(() => [0])
  .mockImplementationOnce(() => [null])
  .mockImplementationOnce(() => [true])

describe('Canvas component', () => {
  test('Render endgame popup correctly', () => {
    const component = renderer.create(<Canvas />).toJSON()
    expect(component).toMatchSnapshot()
  })

  test('Render itself correctly', () => {
    const component = renderer.create(<Canvas />).toJSON()
    expect(component).toMatchSnapshot()
  })
})
