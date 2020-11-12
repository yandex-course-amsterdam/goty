import { State, Player, Projectile } from '../../entities'

export function fire(state: State, velocity: Record<'x' | 'y', number>, context: CanvasRenderingContext2D): void {
  const player = state.getPlayer() as Player
  const projectile = new Projectile(player.x, player.y, 5, 'black', velocity, context)
  state.addProjectile(projectile)
}
