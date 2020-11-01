import React, { ReactElement } from 'react'

import { Avatar, Navigation, NavigationItem, NavigationList } from 'app/components'

import style from './style.css'

type SidebarProps = {
  avatar: string | undefined
  name: string | undefined
}

export const Sidebar = ({ avatar, name }: SidebarProps): ReactElement => {
  return (
    <section className={style.sidebar}>
      <Avatar className={style.avatar} avatar={avatar} name={name} />
      <Navigation>
        <NavigationList>
          <NavigationItem src="../../../images/user.svg" text="Sign In" />
          <NavigationItem src="../../../images/settings.svg" text="Sign Up" />
        </NavigationList>
      </Navigation>
    </section>
  )
}
