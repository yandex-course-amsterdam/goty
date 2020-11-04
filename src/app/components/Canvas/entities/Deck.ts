import { TDeck, TCard } from './Types'

export class Deck implements TDeck {
  cards: TCard[] = []

  shuffleDeck(): void {
    // shuffle deck
  }

  serveCard(): TCard | null {
    const card = this.cards.pop()
    return card ?? null
  }
}
