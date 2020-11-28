import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  type: 'button' | 'submit'
  buttonText: string
  className?: string
  handleClick?: () => void
}

export const Button: FC<IProps> = ({
  type = 'button',
  buttonText,
  className,
  handleClick
}): JSX.Element => (
  <button
    onClick={handleClick}
    className={cn(style.button, className)}
    type={type}
  >
    {buttonText}
  </button>
)
