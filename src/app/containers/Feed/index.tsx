import React, { FC } from 'react'
import { Sidebar, Avatar, Main, Navigation, NewsList } from 'app/components'

import style from './style.css'

export const Feed: FC = (): JSX.Element => (
  <div className={style.signup}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation />
    </Sidebar>
    <Main>
      <h1>Feed</h1>
      <NewsList />
    </Main>
  </div>
)
