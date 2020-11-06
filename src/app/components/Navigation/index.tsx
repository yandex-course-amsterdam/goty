import React, { ReactElement } from 'react'

import style from './style.css'

type NavigationProps = {
  children?: ReactElement[] | ReactElement
  title?: string
}

export const Navigation = ({ children, title }: NavigationProps): ReactElement => {
  return (
    <nav className={style.navigation}>
      {title && <p className={style.title}>{title}</p>}
      {children}
    </nav>
  )
}
