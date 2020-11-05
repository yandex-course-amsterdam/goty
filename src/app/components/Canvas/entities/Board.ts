import { BoardInterface } from '../../../interfaces/index'
import { Slot } from './Slot'

export class Board implements BoardInterface {
  slots: Slot[] = []

  x = 0

  y = 0

  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
