import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { userApi, authApi } from 'app/api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { checkResponseStatus } from 'app/utils'

import style from './style.css'

export const DetailsForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')
  const [initialValues, setInitialValues] = useState({
    first_name: '',
    second_name: '',
    display_name: '',
    login: '',
    email: '',
    phone: ''
  })

  const {
    first_name,
    second_name,
    display_name,
    login,
    email,
    phone
  } = VALIDATION_SCHEMA

  useEffect(() => {
    authApi
      .getUserInfo()
      .then((res) => {
        if (res.status === 200) {
          // eslint-disable-next-line no-shadow
          const { first_name, second_name, login, email, phone } = JSON.parse(
            res.response
          )

          // eslint-disable-next-line no-shadow
          const display_name = JSON.parse(res.response).display_name
            ? JSON.parse(res.response).display_name
            : ''

          setInitialValues({
            ...initialValues,
            first_name,
            second_name,
            display_name,
            login,
            email,
            phone
          })
        }
      })
      .catch((error) => console.log(error))
  }, [])

  const updateUserProfile = async (data: string): Promise<void> => {
    try {
      const res = await userApi.updateProfile(data)

      checkResponseStatus(res, setResponseText)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await updateUserProfile(JSON.stringify(values))
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
          label="Display name"
          name="display_name"
          type="text"
          placeholder="Enter your display surname"
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
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone"
        />
        <div className={style.wrapper}>
          <Error className={style.error} errorText={responseText} />
          <Button
            className={style.button}
            type="submit"
            buttonText="Update Details"
          />
        </div>
      </Form>
    </Formik>
  )
}
