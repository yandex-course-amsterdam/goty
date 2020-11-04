import { THand, TSlot, TCard } from './Types'

export class Hand implements THand {
  slots: TSlot[] = []

  playCard(id: number): TCard | null {
    const slot = this.slots.splice(id, 1)
    const card = slot[0]?.card
    return card ?? null
  }
}
