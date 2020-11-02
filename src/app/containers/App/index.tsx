import React, { ReactElement } from 'react'

import { SignUp } from 'app/containers/SignUp'

import style from './style.css'

export const App = (): ReactElement => {
  return (
    <section className={style.app}>
      <SignUp />
    </section>
  )
}
