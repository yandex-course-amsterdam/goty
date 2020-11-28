import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  className?: string
  errorText?: string
}

export const Error: FC<IProps> = ({ className, errorText }): JSX.Element => (
  <p className={cn(style.error, className)}>{errorText}</p>
)
