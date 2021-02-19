import { BOOST_TYPE, BOOST } from 'app/constants'

import { State, Player } from '../../entities'
import { fireSpree } from '../firemodes'

const checkInsufficientCredits = (
  boost: keyof typeof BOOST_TYPE,
  state: State
): boolean => {
  const credits = state.getCredits()
  return credits < BOOST[boost].price
}

export const handleBoostChoice = (
  boost: keyof typeof BOOST_TYPE,
  state: State,
  context: CanvasRenderingContext2D
): void => {
  const player = state.getPlayer() as Player

  if (player.hasBoost() || checkInsufficientCredits(boost, state)) {
    return
  }

  state.spendCredits(BOOST[boost].price)

  if (boost === BOOST_TYPE.SPREE) {
    player.useBoost(boost)
    fireSpree(state, context)
    return
  }

  player.useBoost(boost)
}
