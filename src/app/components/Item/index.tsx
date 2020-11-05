import React, { ReactElement } from 'react'
import { ReactSVG } from 'react-svg'
import cn from 'classnames'

import style from './style.css'

type ItemProps = {
  text: string
  src?: string
  active?: boolean
  className?: string
}

export const Item = ({ text, src, active, className }: ItemProps): ReactElement => {
  return (
    <li className={cn(style.item, active && style.active, className)}>
      {src && <ReactSVG src={src} className={style.icon} />}
      <p className={style.text}>{text}</p>
    </li>
  )
}
