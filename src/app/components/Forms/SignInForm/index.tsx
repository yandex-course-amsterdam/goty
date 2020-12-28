import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { getServiceId, signIn, createToken } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { route } from 'app/enums'
import {
  fetchUserInfo,
  setUserInfo,
  UserInfoInitial,
  setLoginStatus
} from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

export const SignInForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const [isSignIn, setIsSignIn] = useState(false)
  const dispatch = useDispatch()

  const { login, password } = VALIDATION_SCHEMA
  const initialValues = { login: '', password: '' }
  const validationSchema = Yup.object({ login, password })

  const signInUser = async (data: FormikValues): Promise<void> => {
    try {
      console.log(data)
      await signIn(data)
      await dispatch(fetchUserInfo())
      await createToken(data.login)
      dispatch(setLoginStatus(true))

      setIsSignIn(true)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    signInUser(values)
    setSubmitting(false)
  }

  const redirectToYandexOAuth = async () => {
    try {
      const res = await getServiceId()
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.data.service_id}`
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(setUserInfo(UserInfoInitial))
  }, [])

  return isSignIn ? (
    <Redirect to={route.game} />
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
          <Button
            handleClick={redirectToYandexOAuth}
            className={style.yandexButton}
            buttonText="Sign In With Yandex"
          />
        </div>
      </Form>
    </Formik>
  )
}
