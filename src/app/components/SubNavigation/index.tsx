import React, { ReactElement } from 'react'

import style from './style.css'

type SubNavigationProps = {
  children?: ReactElement[] | ReactElement
  title?: string
}

export const SubNavigation = ({ children, title }: SubNavigationProps): ReactElement => {
  return (
    <>
      {title && <p className={style.title}>{title}</p>}
      <nav className={style.nav}>{children}</nav>
    </>
  )
}
