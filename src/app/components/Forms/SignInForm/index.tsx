import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { authApi } from 'app/api'
import { VALIDATION_SCHEMA, ROUTES } from 'app/constants'
import { fetchUserData, setUserData } from 'app/actions'
import { initialState as userInitialState } from 'app/reducers/userDataReducer'

import style from './style.css'

export const SignInForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const dispatch = useDispatch()
  const { login, password } = VALIDATION_SCHEMA

  const signInUser = async (data: string): Promise<void> => {
    try {
      const res = await authApi.signIn(data)

      if (res.status === 200) {
        await dispatch(fetchUserData())
        setIsSignIn(true)
      } else {
        setResponseText(JSON.parse(res.response).reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(setUserData(userInitialState))
  }, [])

  return isSignIn ? (
    <Redirect to={ROUTES.GAME} />
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
