import { ChangeEvent } from 'react'

export interface StatusInterface {
  setWrongStatus: (event: ChangeEvent<HTMLInputElement>) => void
  setCorrectStatus: (event: ChangeEvent<HTMLInputElement>) => void
}
