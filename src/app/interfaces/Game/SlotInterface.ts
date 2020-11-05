import { CanvasElementInterface } from './CanvasElementInterface'
import { CardInterface } from './CardInterface'

export interface SlotInterface extends CanvasElementInterface {
  id: number
  card: CardInterface | null
}
