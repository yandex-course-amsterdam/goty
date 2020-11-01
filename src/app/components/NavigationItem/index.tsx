import React, { ReactElement } from 'react'

import { ReactSVG } from 'react-svg'

import style from './style.css'

type NavigationItemProps = {
  text: string
  src: string
}

export const NavigationItem = ({ text, src }: NavigationItemProps): ReactElement => {
  return (
    <li className={style.item}>
      <ReactSVG src={src} className={style.icon} />
      <p className={style.text}>{text}</p>
    </li>
  )
}
