import { CanvasElementInterface } from './CanvasElementInterface'
import { SlotInterface } from './SlotInterface'

export interface HandInterface extends CanvasElementInterface {
  slots: SlotInterface[]
}
