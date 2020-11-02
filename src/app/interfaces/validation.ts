import { ChangeEvent } from 'react'

export interface ValidationInterface {
  validate(event: ChangeEvent<HTMLInputElement>): void
  checkValidity(event: ChangeEvent<HTMLInputElement>): void
  checkAllInputs(): boolean
  removeErrors(event: ChangeEvent<HTMLInputElement>): void
  disableButton(): void
  activateButton(): void
}
