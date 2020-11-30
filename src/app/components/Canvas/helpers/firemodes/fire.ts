import { PROJECTILE_RADIUS } from 'app/constants'

import { State, Player, Projectile } from '../../entities'

export const fire = (
  state: State,
  velocity: Record<'x' | 'y', number>,
  context: CanvasRenderingContext2D
): void => {
  const player = state.getPlayer() as Player
  const projectile = new Projectile(
    player.x,
    player.y,
    PROJECTILE_RADIUS,
    'black',
    velocity,
    context
  )
  state.addProjectile(projectile)
}
