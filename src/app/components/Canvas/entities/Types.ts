interface CanvasElementInterface {
  x: number
  y: number
  ctx: CanvasRenderingContext2D | null
}

export enum GameStateEnum {
  INITIAL = 'INITIAL',
  PICK = 'PICK',
  PLAY = 'PLAY',
  END = 'END'
}

export interface GameStateInterface {
  players: PlayerInterface[]
  state: keyof typeof GameStateEnum
  roundCounter: number
  turn: PlayerInterface | null
}

export interface PlayerInterface extends CanvasElementInterface {
  name: string
  score: number
  roundsWon: number
}

export interface BoardInterface extends CanvasElementInterface {
  slots: SlotInterface[]
}

export interface HandInterface extends CanvasElementInterface {
  slots: SlotInterface[]
}

export interface SlotInterface extends CanvasElementInterface {
  id: number
  card: CardInterface | null
}

export interface DeckInterface {
  cards: CardInterface[]
  setCount: number
  ctx: CanvasRenderingContext2D
}

<<<<<<< HEAD
export enum CardTypeEnum {
  BASE = 'BASE',
  ADD = 'ADD',
  SUBCTRACT = 'SUBCTRACT',
  FLIP = 'FLIP'
}

export interface CardInterface extends CanvasElementInterface {
  type: keyof typeof CardTypeEnum
  power: number
  state: CardStateInterface
}

export interface CardStateInterface {
=======
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
>>>>>>> [GOTY-11] Обновил типы и Deck
  slot: number | null
  played: boolean
}

export interface ControlInterface extends CanvasElementInterface {
  text: string
}
