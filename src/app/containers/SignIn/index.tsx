import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Main,
  Description,
  Title,
  Navigation,
  Item,
  List,
  Sidebar,
  SignInForm
} from 'app/components'

import { SettingsIcon, UserIcon } from 'icons'
import { DATA } from './data'

import style from './style.css'

export const SignIn = (): ReactElement => {
  const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

  return (
    <div className={style.signin}>
      <Sidebar>
        <Avatar
          avatar="https://i.imgur.com/Cbyhdku.png"
          name="Top game"
          className={style.avatar}
        />
        <Navigation title="Options">
          <List>
            <Item text="Sign In" active>
              <UserIcon />
            </Item>
            <Link className={style.link} to="/sign-up">
              <Item text="Sign Up">
                <SettingsIcon />
              </Item>
            </Link>
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <div className={style.container}>
          <Title className={style.title} title={mainTitle} />
          <div className={style.overflow}>
            <Description
              className={style.description}
              title={mainDescriptionTitle}
              subtitle={mainDescriptionSubtitle}
            />
            <SignInForm />
          </div>
        </div>
      </Main>
    </div>
  )
}
