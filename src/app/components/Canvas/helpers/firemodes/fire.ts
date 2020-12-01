import { PROJECTILE_RADIUS } from 'app/constants'

import { State, Player, Projectile } from '../../entities'

export const fire = (
  angle: number,
  state: State,
  context: CanvasRenderingContext2D,
  velocityMultiplier = 1
): void => {
  const player = state.getPlayer() as Player
  const velocity = {
    x: Math.cos(angle) * (10 * velocityMultiplier),
    y: Math.sin(angle) * (10 * velocityMultiplier)
  }
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
