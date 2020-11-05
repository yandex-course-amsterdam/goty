import React, { ReactElement } from 'react'
import { Sidebar, Avatar, Navigation, List, Item, Main, Canvas } from 'app/components'

import style from './style.css'

export const Game = (): ReactElement => {
  return (
    <div className={style.signup}>
      <Sidebar>
        <Avatar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" className={style.avatar} />
        <Navigation>
          <List>
            <Item src="../../../images/user.svg" text="Sign In" />
            <Item src="../../../images/settings.svg" text="Sign Up" />
            <Item src="../../../images/correct.svg" text="Play" active />
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <Canvas players={['Han', 'Greedo']} />
      </Main>
    </div>
  )
}
