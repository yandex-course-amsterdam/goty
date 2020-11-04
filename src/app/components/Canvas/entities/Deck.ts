import { TDeck, TCard } from './Types'

export class Deck implements TDeck {
  cards: TCard[] = []

  shuffleDeck(): void {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
    }
  }

  serveCard(): TCard | null {
    const card = this.cards.pop()
    return card ?? null
  }
}
