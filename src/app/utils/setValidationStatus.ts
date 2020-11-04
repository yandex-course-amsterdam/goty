import { ChangeEvent } from 'react'

export const setWrongStatus = (event: ChangeEvent<HTMLInputElement>): void => {
  event.target.style.borderColor = '#F6655A'

  const closestDiv = event.target.closest('div') as HTMLElement

  const wrongIcon = closestDiv.querySelector('#wrong') as HTMLElement

  const correctIcon = closestDiv.querySelector('#correct') as HTMLElement

  if (closestDiv && wrongIcon && correctIcon) {
    wrongIcon.style.display = 'block'

    correctIcon.style.display = 'none'
  }
}

export const setCorrectStatus = (event: ChangeEvent<HTMLInputElement>): void => {
  event.target.style.borderColor = '#87C289'

  const closestDiv = event.target.closest('div') as HTMLElement

  const wrongIcon = closestDiv.querySelector('#wrong') as HTMLElement

  const correctIcon = closestDiv.querySelector('#correct') as HTMLElement

  if (closestDiv && wrongIcon && correctIcon) {
    wrongIcon.style.display = 'none'

    correctIcon.style.display = 'block'
  }
}
