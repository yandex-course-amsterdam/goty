import { BOOST_TYPE } from 'app/constants'

import { State, Player } from '../../entities'
import { fire, fireBurst, fireFraction } from '../firemodes'

export function handleFire(
  angle: number,
  state: State,
  context: CanvasRenderingContext2D
): void {
  const player = state.getPlayer() as Player
  const { boost } = player

  if (boost === BOOST_TYPE.SPREE) {
    return
  }

  switch (boost) {
    case BOOST_TYPE.BURST:
      fireBurst(angle, state, context)
      break
    case BOOST_TYPE.FRACTION:
      fireFraction(angle, state, context)
      break
    default: {
      fire(angle, state, context)
      break
    }
  }
}
