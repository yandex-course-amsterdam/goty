import { State, Player } from '../../entities'

export const handleMoveStart = (evt: KeyboardEvent, state: State): void => {
  const { code } = evt
  const player = state.getPlayer() as Player

  switch (code) {
    case 'KeyW':
      player.setVerticalVelocity(-1)
      break
    case 'KeyD':
      player.setHorizontalVelocity(1)
      break
    case 'KeyS':
      player.setVerticalVelocity(1)
      break
    case 'KeyA':
      player.setHorizontalVelocity(-1)
      break
    default:
      break
  }
}

export const handleMoveStop = (evt: KeyboardEvent, state: State): void => {
  const { code } = evt
  const player = state.getPlayer() as Player

  switch (code) {
    case 'KeyW':
      player.setVerticalVelocity(0)
      break
    case 'KeyD':
      player.setHorizontalVelocity(0)
      break
    case 'KeyS':
      player.setVerticalVelocity(0)
      break
    case 'KeyA':
      player.setHorizontalVelocity(0)
      break
    default:
      break
  }
}
