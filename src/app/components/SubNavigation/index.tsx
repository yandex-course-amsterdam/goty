import React, { FC } from 'react'

import style from './style.css'

interface IProps {
  children?: React.ReactNode
  title?: string
}

export const SubNavigation: FC<IProps> = ({ children, title }): JSX.Element => (
  <>
    {title && <p className={style.title}>{title}</p>}
    <nav className={style.nav}>{children}</nav>
  </>
)
