import { GameStateInterface, GameStateEnum } from '../../../interfaces/index'
import { Player } from './Player'

export class GameState implements GameStateInterface {
  players: Player[] = []
  state = GameStateEnum.INITIAL
  roundCounter = 0
  turn = null

  addPlayer(player: Player): void {
    if (this.players.length >= 2) return

    this.players.push(player)
  }

  startPick(): void {
    if (this.state === GameStateEnum.INITIAL) {
      this.state = GameStateEnum.PICK
    } else {
      console.warn('This is not the state you are looking for')
    }
  }

  startGame(): void {
    if (this.state === GameStateEnum.PICK) {
      this.state = GameStateEnum.PLAY
    } else {
      console.warn('This is not the state you are looking for')
    }
  }

  endGame(): void {
    if (this.state === GameStateEnum.PLAY) {
      this.state = GameStateEnum.END
    } else {
      console.warn('This is not the state you are looking for')
    }
  }
}
