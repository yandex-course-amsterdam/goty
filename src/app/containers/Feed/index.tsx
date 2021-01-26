import React, { FC } from 'react'
import {
  Sidebar,
  Avatar,
  Main,
  Title,
  Navigation,
  NewsList
} from 'app/components'

import style from './style.css'

export const Feed: FC = (): JSX.Element => (
  <div className={style.feed}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation />
    </Sidebar>
    <Main>
      <div className={style.container}>
        <div>
          <Title className={style.title} title="Feed" />
        </div>
        <div className={style.overflow}>
          <NewsList />
        </div>
      </div>
    </Main>
  </div>
)
