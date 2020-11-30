import { BOOST_TYPE } from 'app/constants'

import { State, Player } from '../../entities'
import { fire, fireBurst, fireFraction } from '../firemodes'

export function handleFire(
  evt: React.MouseEvent<HTMLCanvasElement>,
  state: State,
  context: CanvasRenderingContext2D
): void {
  const player = state.getPlayer() as Player
  const { boost } = player

  const { canvas } = context as CanvasRenderingContext2D
  const canvasRect = canvas.getBoundingClientRect()

  const clickPos = {
    x: evt.clientX - canvasRect.x,
    y: evt.clientY - canvasRect.y
  }

  if (boost === BOOST_TYPE.SPREE) {
    return
  }

  const angle = Math.atan2(clickPos.y - player.y, clickPos.x - player.x)

  switch (boost) {
    case BOOST_TYPE.BURST:
      fireBurst(state, angle, context)
      break
    case BOOST_TYPE.FRACTION:
      fireFraction(state, angle, context)
      break
    default: {
      const velocity = {
        x: Math.cos(angle) * 10,
        y: Math.sin(angle) * 10
      }
      fire(state, velocity, context)
      break
    }
  }
}
