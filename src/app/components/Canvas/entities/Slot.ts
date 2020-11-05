import { SlotInterface } from './Types'
import { Card } from './Card'

export class Slot implements SlotInterface {
  id: number

  card: Card | null = null

  x = 0

  y = 0

  ctx

  constructor(id: number, ctx: CanvasRenderingContext2D) {
    this.id = id
    this.ctx = ctx
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
