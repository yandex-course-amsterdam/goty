import React, { FC } from 'react'

import style from './style.css'

interface IProps {
  children?: React.ReactNode
  title?: string
}

export const Container: FC<IProps> = ({ children, title }): JSX.Element => (
  <nav className={style.navigation}>
    {title && <p className={style.title}>{title}</p>}
    {children}
  </nav>
)
