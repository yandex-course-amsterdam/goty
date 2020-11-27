import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { authApi } from 'app/api'
import { VALIDATION_SCHEMA, ROUTE } from 'app/constants'
import { fetchUserData, setUserData } from 'app/actions'
import { initialState as userInitialState } from 'app/reducers/userDataReducer'

import style from './style.css'

export const SignUpForm = (): ReactElement => {
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

  const signUpUser = async (data: string): Promise<void> => {
    try {
      const res = await authApi.signUp(data)

      if (res.status === 200) {
        await dispatch(fetchUserData())
        setIsSignedUp(true)
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

  return isSignedUp ? (
    <Redirect to={ROUTE.GAME} />
  ) : (
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
      onSubmit={(values, { setSubmitting }) => {
        signUpUser(JSON.stringify(values))
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
