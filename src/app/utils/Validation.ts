import { ChangeEvent } from 'react'

import { ErrorsInterface } from 'app/interfaces/errors'
import { ValidationInterface } from 'app/interfaces/validation'
import { StatusInterface } from 'app/interfaces/status'

export class Validation implements ValidationInterface {
  constructor(protected errors: ErrorsInterface, protected form: string, protected status: StatusInterface) {
    this.errors = errors
    this.form = form
    this.status = status
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

      this.status.setWrongStatus(event)

      this.disableButton()
    } else if (isValidityLengthAndErrTrue) {
      // @ts-ignore
      err.textContent = `${event.target.id} ${this.errors.ru[event.target.type]}`

      this.status.setWrongStatus(event)

      this.disableButton()
    } else {
      this.status.setCorrectStatus(event)

      this.removeErrors(event)
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
