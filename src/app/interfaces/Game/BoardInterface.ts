import { CanvasElementInterface } from './CanvasElementInterface'
import { SlotInterface } from './SlotInterface'

export interface BoardInterface extends CanvasElementInterface {
  slots: SlotInterface[]
}
