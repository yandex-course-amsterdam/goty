import React, { ReactElement } from 'react'

import style from './style.css'

type NavigationListProps = {
  children: ReactElement[]
}

export const NavigationList = ({ children }: NavigationListProps): ReactElement => {
  return <ul className={style.list}>{...children}</ul>
}
