import { BOOST_TYPE } from 'app/constants'

import { State, Player } from '../../entities'
import { fireSpree } from '../firemodes'

export const handleBoostChoice = (
  boost: keyof typeof BOOST_TYPE,
  state: State,
  context: CanvasRenderingContext2D
): void => {
  const player = state.getPlayer() as Player

  if (player.hasBoost()) {
    return
  }

  if (boost === BOOST_TYPE.SPREE) {
    player.useBoost(boost)
    fireSpree(state, context)
    return
  }

  player.useBoost(boost)
}
