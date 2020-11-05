import { ControlInterface } from '../../../interfaces/index'

export class Control implements ControlInterface {
  text = ''

  x = 0

  y = 0

  ctx

  constructor(text: string, ctx: CanvasRenderingContext2D) {
    this.text = text
    this.ctx = ctx
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
