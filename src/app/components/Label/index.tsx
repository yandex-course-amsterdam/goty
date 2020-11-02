import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type FormInputLabelProps = {
  id: string
  labelText: string
  className?: string
}

export const Label = ({ id, labelText, className }: FormInputLabelProps): ReactElement => {
  return (
    <label className={cn(style.label, className)} htmlFor={id}>
      {labelText}
    </label>
  )
}
