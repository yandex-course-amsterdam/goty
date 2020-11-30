import { BOOST_TYPE } from 'app/constants'

import { State, Player } from '../../entities'
import { fireSpree } from '../firemodes'

export const handleBoostChoice = (
  evt: KeyboardEvent,
  state: State,
  context: CanvasRenderingContext2D
): void => {
  const player = state.getPlayer() as Player
  const { code } = evt

  if (player.hasBoost()) {
    return
  }

  switch (code) {
    case 'Digit1':
      player.useBoost(BOOST_TYPE.BURST)
      break
    case 'Digit2':
      player.useBoost(BOOST_TYPE.FRACTION)
      break
    case 'Digit3':
      player.useBoost(BOOST_TYPE.SPREE)
      fireSpree(state, context)
      break
    default:
      break
  }
}
