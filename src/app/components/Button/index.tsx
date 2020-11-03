import React, { ReactElement } from 'react'
import cn from 'classnames'

import style from './style.css'

type ButtonProps = {
  type: 'button' | 'submit'
  buttonText: string
  className?: string
  handleClick?: () => void
}

export const Button = ({ type, buttonText, className, handleClick }: ButtonProps): ReactElement => {
  return (
    <button
      onClick={handleClick}
      className={cn(style.button, className)}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled
    >
      {buttonText}
    </button>
  )
}
