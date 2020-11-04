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
}
