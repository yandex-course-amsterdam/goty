import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type FormInputErrorProps = {
  name: string
  className?: string
}

export const Error = ({ name, className }: FormInputErrorProps): ReactElement => {
  return <p id={name} className={cn(style.error, className)} />
}
