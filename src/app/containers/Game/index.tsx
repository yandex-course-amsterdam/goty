import React, { FC } from 'react'
import {
  Sidebar,
  Avatar,
  Navigation,
  List,
  ListItem,
  Main,
  Canvas
} from 'app/components'

import { CorrectIcon, SettingsIcon, UserIcon } from 'icons'

import style from './style.css'

export const Game: FC = (): JSX.Element => (
  <div className={style.signup}>
    <Sidebar>
      <Avatar className={style.avatar} />
      {/* TODO: пометь TODO, чтобы переделать навигацию, она уже в 3 местах повторяется по проекту. подобные контейнеры должны быть один раз описаны и переиспользуемы. имею ввиду List и Item компоненты нужно спрятать внутрь какого-то нового SidebarNavigation контейнера и его использовать везде */}
      <Navigation>
        <List>
          <ListItem text="Sign In">
            <UserIcon />
          </ListItem>
          <ListItem text="Sign Up">
            <SettingsIcon />
          </ListItem>
          <ListItem text="Play" active>
            <CorrectIcon />
          </ListItem>
        </List>
      </Navigation>
    </Sidebar>
    <Main>
      <Canvas />
    </Main>
  </div>
)
