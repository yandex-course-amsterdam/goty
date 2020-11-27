import React, { ReactElement } from 'react'
import {
  Sidebar,
  Avatar,
  Navigation,
  List,
  Item,
  Main,
  Canvas
} from 'app/components'

import { CorrectIcon, SettingsIcon, UserIcon } from 'icons'

import style from './style.css'

export const Game = (): ReactElement => {
  return (
    <div className={style.signup}>
      <Sidebar>
        <Avatar
          avatar="https://i.imgur.com/Cbyhdku.png"
          name="Top game"
          className={style.avatar}
        />
        {/* TODO: пометь TODO, чтобы переделать навигацию, она уже в 3 местах повторяется по проекту. подобные контейнеры должны быть один раз описаны и переиспользуемы. имею ввиду List и Item компоненты нужно спрятать внутрь какого-то нового SidebarNavigation контейнера и его использовать везде */}
        <Navigation>
          <List>
            <Item text="Sign In">
              <UserIcon />
            </Item>
            <Item text="Sign Up">
              <SettingsIcon />
            </Item>
            <Item text="Play" active>
              <CorrectIcon />
            </Item>
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <Canvas />
      </Main>
    </div>
  )
}
