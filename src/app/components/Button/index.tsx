import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  type?: 'button' | 'submit'
  buttonText: string
  className?: string
  disabled?: boolean
  handleClick?: () => void
}

export const Button: FC<IProps> = ({
  type = 'button',
  buttonText,
  className,
  disabled = false,
  handleClick
}): JSX.Element => (
  <button
    onClick={handleClick}
    className={cn(style.button, className)}
    disabled={disabled}
    type={type}
  >
    {buttonText}
  </button>
)
