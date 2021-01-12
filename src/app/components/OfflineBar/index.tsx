import React, { FC } from 'react'

import style from './style.css'

export const OfflineBar: FC = (): JSX.Element => (
  <div className={style.bar}>
    There is some network problem. Please check your internet connection.
  </div>
)
