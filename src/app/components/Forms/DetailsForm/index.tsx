import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { updateProfile } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { StoreState } from 'app/reducers'
import { fetchUserInfo } from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

const selectUserData = (state: StoreState) => {
  const { first_name, second_name, login, email, phone } = state.userInfo
  const display_name = state.userInfo.display_name || ''

  return { first_name, second_name, login, email, phone, display_name }
}

export const DetailsForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch()

  const {
    first_name,
    second_name,
    display_name,
    login,
    email,
    phone
  } = VALIDATION_SCHEMA

  const validationSchema = Yup.object({
    first_name,
    second_name,
    display_name,
    login,
    email,
    phone
  })

  const updateUserProfile = async (data: FormikValues): Promise<void> => {
    try {
      await updateProfile(data)
      await dispatch(fetchUserInfo())
      displayResponseText(setResponseText)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    updateUserProfile(values)
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={userData}
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
