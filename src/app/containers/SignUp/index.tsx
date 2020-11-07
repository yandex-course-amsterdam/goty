import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Form, Main, Description, Title, Navigation, Item, List, Sidebar } from 'app/components'

import { handleLoadReg } from 'app/utils'

import { FORM_DATA } from 'app/constants'
import { DATA } from './data'

import style from './style.css'

export const SignUp = (): ReactElement => {
  const { mainTitle, formName, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

  const { name, email, login, password, phone, surname } = FORM_DATA

  return (
    <div className={style.signup}>
      <Sidebar>
        <Avatar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" className={style.avatar} />
        <Navigation title="Options">
          <List>
            <Link className={style.link} to="/sign-in">
              <Item src="images/user.svg" text="Sign In" />
            </Link>
            <Item src="images/settings.svg" text="Sign Up" active />
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
              formData={[name, surname, login, email, password, phone]}
              handler={handleLoadReg}
              formName={formName}
              buttonText="Sign Up"
              buttonType="submit"
            />
          </div>
        </div>
      </Main>
    </div>
  )
}
