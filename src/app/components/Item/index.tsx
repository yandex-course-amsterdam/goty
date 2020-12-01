import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  text: string
  active?: boolean
  className?: string
  children?: React.ReactNode
}

export const ListItem: FC<IProps> = ({
  text,
  active,
  className,
  children
}): JSX.Element => (
  <li className={cn(style.item, active && style.active, className)}>
    {children}
    <p className={style.text}>{text}</p>
  </li>
)
