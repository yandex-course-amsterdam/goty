import { ChangeEvent } from 'react'

import { ErrorsInterface } from 'app/interfaces/errors'
import { ValidationInterface } from 'app/interfaces/validation'
import { StatusInterface } from 'app/interfaces/status'

export class Validation implements ValidationInterface {
  constructor(protected errors: ErrorsInterface, protected form: HTMLFormElement, protected status: StatusInterface) {
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
    const err = event.target.closest('div')?.nextSibling

    const isValidityLengthAndErrTrue = !event.target.validity.valid && event.target.value.length > 0 && err

    if (event.target.value.length === 0 && err) {
      err.textContent = `${event.target.id} ${this.errors.RU.emptyInput}`

      this.status.setWrongStatus(event)

      this.disableButton()
    } else if (isValidityLengthAndErrTrue) {
      // @ts-ignore
      err.textContent = `${event.target.id} ${this.errors.RU[event.target.type]}`

      this.status.setWrongStatus(event)

      this.disableButton()
    } else {
      this.status.setCorrectStatus(event)

      this.removeErrors(event)
    }
  }

  checkAllInputs(): boolean {
    return Array.from(this.form.elements).every((el) => {
      const input = el as HTMLInputElement

      return input.validity.valid
    })
  }

  removeErrors(event: ChangeEvent<HTMLInputElement>): void {
    const err = event.target.closest('div')?.nextSibling

    if (err) {
      err.textContent = ''
    }
  }

  disableButton(): void {
    const button = this.form.querySelector('button')

    if (button) {
      button.setAttribute('disabled', 'true')
    }
  }

  activateButton(): void {
    const button = this.form.querySelector('button')

    if (button) {
      button.removeAttribute('disabled')
    }
  }
}
