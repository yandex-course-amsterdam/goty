import React, { ReactElement } from 'react'
import cn from 'classnames'

import style from './style.css'

type FormInputErrorProps = {
  className?: string
  errorText?: string
}

export const Error = ({
  className,
  errorText
}: FormInputErrorProps): ReactElement => {
  return <p className={cn(style.error, className)}>{errorText}</p>
}
