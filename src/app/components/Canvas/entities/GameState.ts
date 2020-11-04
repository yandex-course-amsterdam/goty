import { TPlayer } from './Types'

export class GameState {
  players: TPlayer[] = []

  roundCounter = 0

  turn = false

  addPlayer(player: TPlayer): void {
    if (this.players.length > 2) return
    this.players.push(player)
  }

  startRound(): void {
    this.roundCounter += 1
  }

  setTurn(): void {
    this.turn = !this.turn
  }
}
