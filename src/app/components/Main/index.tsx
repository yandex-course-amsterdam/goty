import React, { ReactElement } from 'react'

import { ErrorBoundary } from '../ErrorBoundary'

import style from './style.css'

type MainProps = {
  children?: React.ReactNode
}

export const Main = ({ children }: MainProps): ReactElement => (
  <div className={style.main}>
    <ErrorBoundary>
      <main>{children}</main>
    </ErrorBoundary>
  </div>
)
