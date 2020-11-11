import React, { ReactElement, useState } from 'react'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { authApi } from 'app/api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { checkResponseStatus } from 'app/utils'

import style from './style.css'

export const SignUpForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')

  const {
    first_name,
    second_name,
    login,
    email,
    password,
    phone
  } = VALIDATION_SCHEMA

  const signUpUser = async (data: string): Promise<void> => {
    try {
      const res = await authApi.signUp(data)

      checkResponseStatus(res, setResponseText, 'Successfully sign up')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        password: '',
        phone: ''
      }}
      validationSchema={Yup.object({
        first_name,
        second_name,
        login,
        email,
        password,
        phone
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await signUpUser(JSON.stringify(values))
        setSubmitting(false)
      }}
    >
      <Form>
        <Input
          label="Name"
          name="first_name"
          type="text"
          placeholder="Enter your name"
        />
        <Input
          label="Surname"
          name="second_name"
          type="text"
          placeholder="Enter your surname"
        />
        <Input
          label="Login"
          name="login"
          type="text"
          placeholder="Enter your login"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone"
        />
        <div className={style.wrapper}>
          <Error className={style.error} errorText={responseText} />
          <Button className={style.button} type="submit" buttonText="Sign Up" />
        </div>
      </Form>
    </Formik>
  )
}
