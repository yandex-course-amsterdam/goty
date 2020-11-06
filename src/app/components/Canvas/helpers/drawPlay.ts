import { GameState } from '../entities'

export const drawPlay = (gameState: GameState, ctx: CanvasRenderingContext2D): void => {
  const { width, height } = ctx.canvas

  console.log(gameState.state)

  ctx.fillStyle = 'blue'
  ctx.fillRect(width / 2 - 100, height / 2 - 50, 200, 100)
}
