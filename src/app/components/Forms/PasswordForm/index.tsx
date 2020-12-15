import React, { FC, useState } from 'react'
import { Button, Error, Input } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { updatePassword } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { displayResponseText } from 'app/utils'

import style from './style.css'

export const PasswordForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')

  const { password: oldPassword } = VALIDATION_SCHEMA
  const { password: newPassword } = VALIDATION_SCHEMA
  const initialValues = { oldPassword: '', newPassword: '' }
  const validationSchema = Yup.object({ oldPassword, newPassword })

  const updateUserPassword = async (data: FormikValues): Promise<void> => {
    try {
      await updatePassword(data)
      displayResponseText(setResponseText)
    } catch (error) {
      displayResponseText(setResponseText, error)
    }
  }

  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    await updateUserPassword(values)
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Input
          label="Old Password"
          name="oldPassword"
          type="password"
          placeholder="Enter your old password"
        />
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          placeholder="Enter your new password"
        />
        <div className={style.wrapper}>
          <Error className={style.error} errorText={responseText} />
          <Button
            className={style.button}
            type="submit"
            buttonText="Update Password"
          />
        </div>
      </Form>
    </Formik>
  )
}
