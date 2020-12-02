import React, { FC } from 'react'
import { Sidebar, Avatar, Main, Canvas, Navigation } from 'app/components'

import style from './style.css'

export const Game: FC = (): JSX.Element => (
  <div className={style.signup}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation />
    </Sidebar>
    <Main>
      <Canvas />
    </Main>
  </div>
)
