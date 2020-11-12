import React, { ReactElement } from 'react'

import style from './style.css'

type MainProps = {
  children?: React.ReactNode
}

export const Main = ({ children }: MainProps): ReactElement => (
  <main className={style.main}>{children}</main>
)
