import React, { FC } from 'react'
import { useRouteMatch } from 'react-router-dom'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  text: string
  root?: string
  active?: boolean
  className?: string
  children?: React.ReactNode
}

export const ListItem: FC<IProps> = ({
  text,
  className,
  children,
  root
}): JSX.Element => {
  const { url } = useRouteMatch()

  return (
    <li className={cn(style.item, className, root === url && style.active)}>
      {children}
      <p className={style.text}>{text}</p>
    </li>
  )
}
