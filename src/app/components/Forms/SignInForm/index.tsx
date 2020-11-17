import React, { ReactElement, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { authApi } from 'app/api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { checkResponseStatus } from 'app/utils'

import style from './style.css'

export const SignInForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const { login, password } = VALIDATION_SCHEMA

  const signInUser = async (data: string): Promise<void> => {
    try {
      const res = await authApi.signIn(data)

      checkResponseStatus(res, setResponseText, 'Successfully sign in')
      setIsSignIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  return isSignIn ? (
    <Redirect to="/profile" />
  ) : (
    <Formik
      initialValues={{
        login: '',
        password: ''
      }}
      validationSchema={Yup.object({
        login,
        password
      })}
      onSubmit={(values, { setSubmitting }) => {
        signInUser(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }}
    >
      <Form>
        <Input
          label="Login"
          name="login"
          type="text"
          placeholder="Enter your login"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
        />
        <div className={style.wrapper}>
          <Error className={style.error} errorText={responseText} />
          <Button className={style.button} type="submit" buttonText="Sign In" />
        </div>
      </Form>
    </Formik>
  )
}
