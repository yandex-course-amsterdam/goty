import React, { ReactElement } from 'react'

import style from './style.css'

export const Loader = (): ReactElement => {
  return (
    <section className={style.loader}>
      <div className={style.circle} />
      <div className={style.circle} />
      <div className={style.circle} />
    </section>
  )
}
