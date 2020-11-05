import { CanvasElementInterface } from './CanvasElementInterface'
import { CardTypeEnum } from './CardTypeEnum'
import { CardStateInterface } from './CardStateInterface'

export interface CardInterface extends CanvasElementInterface {
  type: keyof typeof CardTypeEnum
  power: number
  state: CardStateInterface
}
