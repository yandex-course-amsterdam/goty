import { BURST_LENGTH } from 'app/constants'

import { State } from '../../entities'
import { fire } from './fire'

const burstVelocityMultiplier = 2

export const fireBurst = (
  angle: number,
  state: State,
  context: CanvasRenderingContext2D
): void => {
  fire(angle, state, context, burstVelocityMultiplier)

  let i = 1
  const burstInterval = setInterval(() => {
    fire(angle, state, context, burstVelocityMultiplier)
    i += 1
    if (i === BURST_LENGTH) {
      clearInterval(burstInterval)
    }
  }, 50)
}
