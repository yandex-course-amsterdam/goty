export const ITEM_NAME = 'amsterdamScore'

export const getScore = (): Record<string, any> | null => {
  const scoreCurrent = localStorage.getItem(ITEM_NAME)
  return scoreCurrent ? JSON.parse(scoreCurrent) : null
}

export const storeScore = (scoreNew: Record<string, any>): void => {
  const scoreCurrent = getScore()
  let scoreGreater = scoreNew

  if (
    scoreCurrent &&
    scoreCurrent.data[ITEM_NAME] > scoreGreater.data[ITEM_NAME]
  ) {
    scoreGreater = scoreCurrent
  }

  localStorage.setItem(ITEM_NAME, JSON.stringify(scoreGreater))
}

export const removeScore = (): void => {
  localStorage.removeItem(ITEM_NAME)
}
