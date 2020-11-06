import { CanvasElementInterface } from './CanvasElementInterface'

export interface PlayerInterface extends CanvasElementInterface {
  name: string
  score: number
  roundsWon: number
}
