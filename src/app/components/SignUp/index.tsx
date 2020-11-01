import React, { ReactElement } from 'react'

import { MainTitle, MainDescription, FormSignUp } from 'app/components'

import style from './style.css'

export const SignUp = (): ReactElement => {
  return (
    <section className={style.container}>
      <MainTitle className={style.title} title="Sign Up" />
      <div className={style.overflow}>
        <MainDescription
          className={style.description}
          title="User info details"
          subtitle="Don’t worry, your information will be kept in safe and we will not share this info with anyone outside."
        />
        <FormSignUp />
      </div>
    </section>
  )
}
