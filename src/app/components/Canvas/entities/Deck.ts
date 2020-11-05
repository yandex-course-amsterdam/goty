import { DeckInterface, CardTypeEnum } from '../../../interfaces/index'
import { Card } from './Card'

export class Deck implements DeckInterface {
  cards: Card[] = []
  setCount = 4
  ctx

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.buildDeck()
  }

  buildDeck(): void {
    this.cards = []

    for (let i = 1; i <= 10; i += 1) {
      for (let j = 0; j < this.setCount; j += 1) {
        this.cards.push(new Card(CardTypeEnum.BASE, i, { slot: null, played: false }, this.ctx))
      }
    }
  }

  shuffleDeck(): void {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))

      const tmp = this.cards[j]
      this.cards[j] = this.cards[i]
      this.cards[i] = tmp
    }
  }

  serveCard(): Card | null {
    const card = this.cards.pop()
    return card ?? null
  }
}
