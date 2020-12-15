import React, { FC } from 'react'

import { ErrorBoundary } from 'app/components'

import style from './style.css'

interface IProps {
  children?: React.ReactNode
}

export const Main: FC<IProps> = ({ children }): JSX.Element => (
  <main className={style.main}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </main>
)
