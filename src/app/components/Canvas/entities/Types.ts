export type TPlayer = {
  name: string
  score: number
}

export type TBoard = {
  slots: TSlot[]
}

export type THand = {
  slots: TSlot[]
}

export type TSlot = {
  id: number
  pos: Record<'x' | 'y', number>
  card: TCard | null
}

export type TDeck = {
  cards: TCard[]
}

export enum ECardType {
  BASE,
  ADD,
  SUBCTRACT,
  FLIP
}

export type TCard = {
  type: keyof typeof ECardType
  power: number
  state: TCardState | null
}

export type TCardState = {
  slot: number | null
  played: boolean
}
