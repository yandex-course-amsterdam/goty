import React, { ReactElement } from 'react'

import cn from 'classnames'

import { ReactSVG } from 'react-svg'

import style from './style.css'

type ItemProps = {
  text: string
  src: string
  active?: boolean
}

export const Item = ({ text, src, active }: ItemProps): ReactElement => {
  return (
    <li className={cn(style.item, active && style.active)}>
      <ReactSVG src={src} className={style.icon} />
      <p className={style.text}>{text}</p>
    </li>
  )
}
