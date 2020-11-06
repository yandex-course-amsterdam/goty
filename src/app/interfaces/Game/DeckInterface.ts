import { CardInterface } from './CardInterface'

export interface DeckInterface {
  cards: CardInterface[]
  setCount: number
  ctx: CanvasRenderingContext2D
}
