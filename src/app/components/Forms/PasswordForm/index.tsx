import React, { ReactElement, useState } from 'react'
import { Button, Error, Input } from 'app/components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { userApi } from 'app/api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { checkResponseStatus } from 'app/utils'

import style from './style.css'

export const PasswordForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')
  const { password: oldPassword } = VALIDATION_SCHEMA
  const { password: newPassword } = VALIDATION_SCHEMA

  const updateUserPassword = async (data: string): Promise<void> => {
    try {
      const res = await userApi.updatePass(data)

      checkResponseStatus(res, setResponseText)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: ''
      }}
      validationSchema={Yup.object({
        oldPassword,
        newPassword
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await updateUserPassword(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }}
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
