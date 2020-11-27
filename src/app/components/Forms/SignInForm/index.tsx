import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { authApi } from 'app/api'
import { VALIDATION_SCHEMA, ROUTE } from 'app/constants'
import { fetchUserInfo, setUserInfo, UserInfoInitial } from 'app/actions'

import style from './style.css'

export const SignInForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const dispatch = useDispatch()

  const { login, password } = VALIDATION_SCHEMA
  const initialValues = { login: '', password: '' }
  const validationSchema = Yup.object({ login, password })

  const signInUser = async (data: string): Promise<void> => {
    try {
      const res = await authApi.signIn(data)

      if (res.status === 200) {
        await dispatch(fetchUserInfo())
        setIsSignIn(true)
      } else {
        setResponseText(JSON.parse(res.response).reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    signInUser(JSON.stringify(values, null, 2))
    setSubmitting(false)
  }

  useEffect(() => {
    dispatch(setUserInfo(UserInfoInitial))
  }, [])

  return isSignIn ? (
    <Redirect to={ROUTE.GAME} />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
