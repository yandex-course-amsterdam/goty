import { ChangeEvent } from 'react'

import { ErrorsInterface } from 'app/interfaces/errors'
import { ValidationInterface } from 'app/interfaces/validation'

export class Validation implements ValidationInterface {
  constructor(protected errors: ErrorsInterface, protected form: string) {
    this.errors = errors
    this.form = form
  }

  validate(event: ChangeEvent<HTMLInputElement>): void {
    this.checkValidity(event)

    if (this.checkAllInputs()) {
      this.activateButton()
    } else {
      this.disableButton()
    }
  }

  checkValidity(event: ChangeEvent<HTMLInputElement>): void {
    const err = document.querySelector(`#${this.form} #${event.target.name}`)

    const isValidityLengthAndErrTrue = !event.target.validity.valid && event.target.value.length > 0 && err

    if (event.target.value.length === 0 && err) {
      err.textContent = `${event.target.id} ${this.errors.ru.emptyInput}`

      this.setWrongStatus(event)

      this.disableButton()
    } else if (isValidityLengthAndErrTrue) {
      // @ts-ignore
      err.textContent = `${event.target.id} ${this.errors.ru[event.target.type]}`

      this.setWrongStatus(event)

      this.disableButton()
    } else {
      this.setCorrectStatus(event)

      this.removeErrors(event)
    }
  }

  setWrongStatus(event: ChangeEvent<HTMLInputElement>): void {
    event.target.style.borderColor = '#F6655A'

    const closestDiv = event.target.closest('div') as HTMLElement

    const wrongIcon = closestDiv.querySelector('#wrong') as HTMLElement

    const correctIcon = closestDiv.querySelector('#correct') as HTMLElement

    if (closestDiv && wrongIcon && correctIcon) {
      wrongIcon.style.display = 'block'

      correctIcon.style.display = 'none'
    }
  }

  setCorrectStatus(event: ChangeEvent<HTMLInputElement>): void {
    event.target.style.borderColor = '#87C289'

    const closestDiv = event.target.closest('div') as HTMLElement

    const wrongIcon = closestDiv.querySelector('#wrong') as HTMLElement

    const correctIcon = closestDiv.querySelector('#correct') as HTMLElement

    if (closestDiv && wrongIcon && correctIcon) {
      wrongIcon.style.display = 'none'

      correctIcon.style.display = 'block'
    }
  }

  checkAllInputs(): boolean {
    const inputs = document.querySelectorAll(`#${this.form} input`) as NodeListOf<HTMLInputElement>

    return Array.from(inputs).every((input) => input.validity.valid)
  }

  removeErrors(event: ChangeEvent<HTMLInputElement>): void {
    const err = document.querySelector(`#${this.form} #${event.target.name}`)

    if (err) {
      err.textContent = ''
    }
  }

  disableButton(): void {
    const button = document.querySelector(`#${this.form} button[type="submit"]`) as HTMLElement

    if (button) {
      button.setAttribute('disabled', 'true')
    }
  }

  activateButton(): void {
    const button = document.querySelector(`#${this.form} button[type="submit"]`) as HTMLElement

    if (button) {
      button.removeAttribute('disabled')
    }
  }
}
