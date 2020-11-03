import React, { ReactElement } from 'react'

import style from './style.css'

type MainProps = {
  children?: ReactElement[] | ReactElement
}

export const Main = ({ children }: MainProps): ReactElement => <main className={style.main}>{children}</main>
