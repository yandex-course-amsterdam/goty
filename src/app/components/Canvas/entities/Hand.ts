import { HandInterface } from '../../../interfaces/index'
import { Slot } from './Slot'
import { Card } from './Card'

export class Hand implements HandInterface {
  slots: Slot[] = []
  x = 0
  y = 0
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  playCard(id: number): Card | null {
    const slot = this.slots.splice(id, 1)
    const card = slot[0]?.card
    return card ?? null
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
