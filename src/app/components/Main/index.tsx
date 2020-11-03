import React, { ReactElement } from 'react'

import style from './style.css'

type MainProps = {
  children: ReactElement[] | ReactElement
}

export const Main = ({ children }: MainProps): ReactElement =>
  Array.isArray(children) ? (
    <section className={style.main}>{...children}</section>
  ) : (
    <section className={style.main}>{children}</section>
  )
