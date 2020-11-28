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
  SignUpForm
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

export const SignUp: FC = (): JSX.Element => (
  <div className={style.signup}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation title="Options">
        <List>
          <Link className={style.link} to={route.signIn}>
            <ListItem text="Sign In">
              <UserIcon />
            </ListItem>
          </Link>
          <ListItem text="Sign Up" active>
            <SettingsIcon />
          </ListItem>
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
