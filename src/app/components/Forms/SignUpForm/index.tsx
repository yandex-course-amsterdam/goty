import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { signUp } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { route } from 'app/enums'
import { fetchUserInfo, setUserInfo, UserInfoInitial } from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

export const SignUpForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const [isSignedUp, setIsSignedUp] = useState(false)
  const dispatch = useDispatch()

  const {
    first_name,
    second_name,
    login,
    email,
    password,
    phone
  } = VALIDATION_SCHEMA
  const initialValues = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: ''
  }
  const validationSchema = Yup.object({
    first_name,
    second_name,
    login,
    email,
    password,
    phone
  })

  const signUpUser = async (data: FormikValues): Promise<void> => {
    try {
      await signUp(data)
      await dispatch(fetchUserInfo(true))
      setIsSignedUp(true)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    signUpUser(values)
    setSubmitting(false)
  }

  useEffect(() => {
    dispatch(setUserInfo(UserInfoInitial))
  }, [])

  return isSignedUp ? (
    <Redirect to={route.game} />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
