import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Form, Main, Description, Title, Navigation, Item, List, Sidebar } from 'app/components'

import { handleLoadAuth } from 'app/utils'

import { FORM_DATA } from 'app/constants'

import UserIcon from 'images/user.svg'
import SettingsIcon from 'images/settings.svg'

import { DATA } from './data'

import style from './style.css'

export const SignIn = (): ReactElement => {
  const { mainTitle, formName, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

  const { login, password } = FORM_DATA

  return (
    <div className={style.signin}>
      <Sidebar>
        <Avatar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" className={style.avatar} />
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
            <Form
              formData={[login, password]}
              handler={handleLoadAuth}
              formName={formName}
              buttonText="Sign In"
              buttonType="submit"
            />
          </div>
        </div>
      </Main>
    </div>
  )
}
