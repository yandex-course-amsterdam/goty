import React, { FC } from 'react'

import style from './style.css'

export const Loader: FC = (): JSX.Element => (
  <section className={style.loader}>
    <div className={style.circle} />
    <div className={style.circle} />
    <div className={style.circle} />
  </section>
)
