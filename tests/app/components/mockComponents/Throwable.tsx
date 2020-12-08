import React from 'react'

export const Throwable: React.FC = (): never => {
  throw new Error('Oops...')
}
