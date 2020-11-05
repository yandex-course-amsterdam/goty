import { PlayerInterface } from './Types'

export class Player implements PlayerInterface {
  name = ''

  score = 0

  roundsWon = 0

  x = 0

  y = 0

  ctx

  constructor(name: string, ctx: CanvasRenderingContext2D) {
    this.name = name
    this.ctx = ctx
  }

  changeScore(value: number): void {
    this.score += value
  }

  winRound(): void {
    this.roundsWon += 1

    if (this.roundsWon === 3) console.log('ez')
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
