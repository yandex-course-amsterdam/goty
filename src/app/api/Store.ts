const ITEM_NAME = 'score'

export class Store {
  storage = window.localStorage

  getScores(): unknown[] {
    const scoresRaw = this.storage.getItem(ITEM_NAME)
    let scoresParsed = []

    if (scoresRaw) {
      scoresParsed = JSON.parse(scoresRaw)
    }

    return scoresParsed
  }

  putScores(score: unknown[]): void {
    const scoresRaw = this.storage.getItem(ITEM_NAME)
    let scoresParsed = []

    if (scoresRaw) {
      scoresParsed = JSON.parse(scoresRaw)
    }

    scoresParsed.push(score)

    const scoreStringified = JSON.stringify(scoresParsed)

    this.storage.setItem(ITEM_NAME, JSON.stringify(scoreStringified))
  }
}
