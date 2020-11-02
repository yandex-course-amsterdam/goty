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

    event.target.closest('div').querySelectorAll('span')[2].style.display = 'none'

    event.target.closest('div').querySelectorAll('span')[0].style.display = 'block'
  }

  setCorrectStatus(event: ChangeEvent<HTMLInputElement>): void {
    event.target.style.borderColor = '#87C289'

    event.target.closest('div').querySelectorAll('span')[0].style.display = 'none'

    event.target.closest('div').querySelectorAll('span')[2].style.display = 'block'
  }

  checkAllInputs(): boolean {
    const inputs = document.querySelectorAll(`#${this.form} input`) as NodeListOf<HTMLInputElement>

    return Array.from(inputs).every((input) => input.validity.valid === true)
  }

  removeErrors(event: ChangeEvent<HTMLInputElement>): void {
    const err = document.querySelector(`#${this.form} #${event.target.name}`)

    if (err) {
      err.textContent = ''
    }
  }

  disableButton(): void {
    document.querySelector(`#${this.form} button[type="submit"]`).setAttribute('disabled', 'true')
  }

  activateButton(): void {
    document.querySelector(`#${this.form} button[type="submit"]`).removeAttribute('disabled')
  }
}
