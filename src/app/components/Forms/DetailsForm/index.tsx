import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { updateProfile } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { StoreState } from 'app/reducers'
import { fetchUserInfo, UserInfo, transformToDTO } from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

const selectUserData = (state: StoreState) => {
  const { firstName, secondName, login, email, phone } = state.userInfo
  const displayName = state.userInfo.displayName || ''

  return { firstName, secondName, login, email, phone, displayName }
}

export const DetailsForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const userData = useSelector(selectUserData)
  const dispatch = useDispatch()

  const {
    firstName,
    secondName,
    displayName,
    login,
    email,
    phone
  } = VALIDATION_SCHEMA

  const validationSchema = Yup.object({
    firstName,
    secondName,
    displayName,
    login,
    email,
    phone
  })

  const updateUserProfile = async (data: UserInfo): Promise<void> => {
    try {
      await updateProfile(transformToDTO(data))
      await dispatch(fetchUserInfo())
      displayResponseText(setResponseText)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const handleSubmit = (values: UserInfo, { setSubmitting }: FormikValues) => {
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
          name="firstName"
          type="text"
          placeholder="Enter your name"
        />
        <Input
          label="Surname"
          name="secondName"
          type="text"
          placeholder="Enter your surname"
        />
        <Input
          label="Display name"
          name="displayName"
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
