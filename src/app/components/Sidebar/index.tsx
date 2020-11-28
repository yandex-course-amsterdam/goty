import React, { FC } from 'react'

import style from './style.css'

interface IProps {
  children?: React.ReactNode
}

export const Sidebar: FC<IProps> = ({ children }): JSX.Element => (
  <aside className={style.sidebar}>{children}</aside>
)
