import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { userApi } from 'app/api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { UserDataState } from 'app/reducers/userDataReducer'
import { setUserData } from 'app/actions'

import style from './style.css'

const selectUserData = (state: { userData: UserDataState }) => {
  const { first_name, second_name, login, email, phone } = state.userData
  const display_name = state.userData.display_name || ''

  return { first_name, second_name, login, email, phone, display_name }
}

export const DetailsForm = (): ReactElement => {
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

  const updateUserProfile = async (data: string): Promise<void> => {
    try {
      const res = await userApi.updateProfile(data)
      const userResponseData = JSON.parse(res.response)

      if (res.status === 200) {
        dispatch(setUserData(userResponseData))
        setResponseText('Successfully updated')
      } else {
        setResponseText(userResponseData.reason)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={userData}
      validationSchema={Yup.object({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone
      })}
      onSubmit={(values, { setSubmitting }) => {
        updateUserProfile(JSON.stringify(values))
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
