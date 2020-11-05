import { CardInterface, CardTypeEnum, CardStateInterface } from '../../../interfaces/index'

export class Card implements CardInterface {
  type: keyof typeof CardTypeEnum
  power: number
  state: CardStateInterface
  x = 0
  y = 0
  ctx

  constructor(
    type: keyof typeof CardTypeEnum,
    power: number,
    state: CardStateInterface,
    ctx: CanvasRenderingContext2D
  ) {
    this.type = type
    this.power = power
    this.state = state
    this.ctx = ctx
  }

  draw(x: number, y: number): void {
    this.x = x
    this.y = y
  }
}
