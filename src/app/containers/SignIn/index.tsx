import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Main,
  Description,
  Title,
  Navigation,
  ListItem,
  List,
  Sidebar,
  SignInForm
} from 'app/components'

import { SettingsIcon, UserIcon } from 'icons'
import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'

import style from './style.css'

const {
  mainTitle,
  mainDescriptionSubtitle,
  mainDescriptionTitle
} = TRANSLATIONS

export const SignIn: FC = (): JSX.Element => (
  <div className={style.signin}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation title="Options">
        <List>
          <ListItem text="Sign In" active>
            <UserIcon />
          </ListItem>
          <Link className={style.link} to={route.signUp}>
            <ListItem text="Sign Up">
              <SettingsIcon />
            </ListItem>
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
