<<<<<<< HEAD
import { CardInterface, CardTypeEnum, CardStateInterface } from './Types'

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
=======
import { TCard, ECardType, TCardState } from './Types'

export class Card implements TCard {
  type: keyof typeof ECardType

  power: number

  state: TCardState

  constructor(type: keyof typeof ECardType, power: number) {
    this.type = type
    this.power = power
    this.state = { slot: null, played: false }
  }

  playCard() {
    this.state.played = true
  }

  draw() {}

  update() {}
>>>>>>> [GOTY-11] Обновил типы и Deck
}
