import { SPREE_ROUND_COUNT } from 'app/constants'

import { State, Player } from '../../entities'
import { fire } from './fire'

const points = [
  [0, 1],
  [0.5, 1],
  [1, 1],
  [1, 0.5],
  [1, 0],
  [1, -0.5],
  [1, -1],
  [0.5, -1],
  [0, -1],
  [-0.5, -1],
  [-1, -1],
  [-1, -0.5],
  [-1, 0],
  [-1, 0.5],
  [-1, 1],
  [-0.5, 1]
]

export const fireSpree = (
  state: State,
  context: CanvasRenderingContext2D
): void => {
  const player = state.getPlayer() as Player
  let i = 0
  let round = 0

  const spreeInterval = setInterval(() => {
    const angle = Math.atan2(
      player.y - points[i][1] - player.y,
      player.x + points[i][0] - player.x
    )

    fire(angle, state, context)
    fire(angle - Math.PI, state, context)

    i += 1
    if (i === points.length) {
      i = 0
      round += 1
    }
    if (round === SPREE_ROUND_COUNT) {
      clearInterval(spreeInterval)
    }
  }, 50)
}
