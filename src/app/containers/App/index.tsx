import React, { ReactElement } from 'react'

import { Sidebar, Main, SignUp } from 'app/components'

import style from './style.css'

export const App = (): ReactElement => {
  return (
    <section className={style.app}>
      <Sidebar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" />
      <Main>
        <SignUp />
      </Main>
    </section>
  )
}
