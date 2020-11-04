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

export type TCard = {
  type: ECardType
  power: number
  state: TCardState
}

export enum ECardType {
  BASE,
  ADD,
  SUBCTRACT,
  FLIP
}

export type TCardState = {
  slot: number | null
  played: boolean
}
