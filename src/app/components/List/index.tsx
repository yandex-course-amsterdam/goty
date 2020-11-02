import React, { ReactElement } from 'react'

import style from './style.css'

type ListProps = {
  children: ReactElement[]
}

export const List = ({ children }: ListProps): ReactElement => {
  return <ul className={style.list}>{...children}</ul>
}
