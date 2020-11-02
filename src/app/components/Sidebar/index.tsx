import React, { ReactElement } from 'react'

import style from './style.css'

type SidebarProps = {
  children?: ReactElement | ReactElement[]
}

export const Sidebar = ({ children }: SidebarProps): ReactElement => {
  return <section className={style.sidebar}>{children}</section>
}
