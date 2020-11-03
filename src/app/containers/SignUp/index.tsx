import React, { ReactElement } from 'react'

import { Avatar, Form, Main, Description, Title, Navigation, Item, List, Sidebar } from 'app/components'

import { handleReg } from 'app/utils/handleReg'

import { FORM_DATA } from 'app/constants'

import { data } from './data'

import style from './style.css'

export const SignUp = (): ReactElement => {
  const { mainTitle, formName, mainDescriptionSubtitle, mainDescriptionTitle } = data

  const { name, email, login, password, phone, surname } = FORM_DATA

  return (
    <div className={style.signup}>
      <Sidebar>
        <Avatar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" className={style.avatar} />
        <Navigation>
          <List>
            <Item src="../../../images/user.svg" text="Sign In" />
            <Item src="../../../images/settings.svg" text="Sign Up" active />
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <section className={style.container}>
          <Title className={style.title} title={mainTitle} />
          <div className={style.overflow}>
            <Description
              className={style.description}
              title={mainDescriptionTitle}
              subtitle={mainDescriptionSubtitle}
            />
            <Form
              formData={[name, surname, login, email, password, phone]}
              handler={handleReg}
              formName={formName}
              buttonText="Sign Up"
              buttonType="submit"
            />
          </div>
        </section>
      </Main>
    </div>
  )
}
