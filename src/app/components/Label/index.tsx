import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  id: string
  labelText: string
  className?: string
}

export const Label: FC<IProps> = ({
  id,
  labelText,
  className
}): JSX.Element => (
  <label className={cn(style.label, className)} htmlFor={id}>
    {labelText}
  </label>
)
