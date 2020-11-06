import { GameState } from '../entities'

export const drawInitial = (gameState: GameState, ctx: CanvasRenderingContext2D): void => {
  const { width, height } = ctx.canvas

  console.log(gameState.state)

  ctx.fillStyle = 'yellow'
  ctx.fillRect(width / 2 - 100, height / 2 - 50, 200, 100)
}
