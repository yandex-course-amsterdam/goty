import React, { ReactElement } from 'react'

import style from './style.css'

type NavigationProps = {
  children: ReactElement
}

export const Navigation = ({ children }: NavigationProps): ReactElement => {
  return (
    <nav className={style.navigation}>
      <p className={style.title}>Options</p>
      {children}
    </nav>
  )
}
