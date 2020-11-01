import React, { ReactElement } from 'react'

import style from './style.css'

type FormProps = {
  children: ReactElement[]
}

export const Form = ({ children }: FormProps): ReactElement => {
  return (
    <form className={style.form} noValidate>
      {children}
    </form>
  )
}
