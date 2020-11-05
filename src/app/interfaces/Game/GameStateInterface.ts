import { PlayerInterface } from './PlayerInterface'
import { GameStateEnum } from './GameStateEnum'

export interface GameStateInterface {
  players: PlayerInterface[]
  state: keyof typeof GameStateEnum
  roundCounter: number
  turn: PlayerInterface | null
}
