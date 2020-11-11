import React, { ReactElement } from 'react'
import cn from 'classnames'

import style from './style.css'

type ItemProps = {
  text: string
  active?: boolean
  className?: string
  children?: React.ReactNode
}

export const Item = ({ text, active, className, children }: ItemProps): ReactElement => {
  return (
    <li className={cn(style.item, active && style.active, className)}>
      {children}
      <p className={style.text}>{text}</p>
    </li>
  )
}
