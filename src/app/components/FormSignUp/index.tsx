import React, { ReactElement } from 'react'

import { Form, FormInputLabel, FormInputWithError } from 'app/components'

import { data } from './data'

import style from './style.css'

export const FormSignUp = (): ReactElement => {
  return (
    <Form>
      {data.map(({ id, labelText, type, placeholder, ...props }) => (
        <div key={labelText} className={style.container}>
          <FormInputLabel className={style.label} id={id} labelText={labelText} />
          <div className={style.wrapper}>
            <FormInputWithError type={type} id={id} placeholder={placeholder} {...props} />
          </div>
        </div>
      ))}
    </Form>
  )
}
