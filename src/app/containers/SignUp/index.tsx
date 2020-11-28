import React, { FC } from 'react'
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
  SignUpForm
} from 'app/components'

import { SettingsIcon, UserIcon } from 'icons'
import { route } from 'app/enums'
import { DATA } from './data'

import style from './style.css'

const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

export const SignUp: FC = (): JSX.Element => (
  <div className={style.signup}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation title="Options">
        <List>
          <Link className={style.link} to={route.signIn}>
            <Item text="Sign In">
              <UserIcon />
            </Item>
          </Link>
          <Item text="Sign Up" active>
            <SettingsIcon />
          </Item>
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
          <SignUpForm />
        </div>
      </div>
    </Main>
  </div>
)
