import React, { FC, useState } from 'react'
import { Button, Error, Input, Textarea } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { sendFeedback } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { displayResponseText } from 'app/utils'

import style from './style.css'

export const FeedbackForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const [isFeedbackSent, setIsFeedbackSent] = useState(false)

  const { login, email } = VALIDATION_SCHEMA
  const initialValues = { login: '', email: '', feedback: '' }
  const validationSchema = Yup.object({ login, email })

  const sendUserFeedback = async (data: FormikValues): Promise<void> => {
    try {
      await sendFeedback(data)

      setIsFeedbackSent(true)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const handleSubmit = (
    values: FormikValues,
    { setSubmitting }: FormikValues
  ) => {
    sendUserFeedback(values)
    setSubmitting(false)
  }

  return isFeedbackSent ? (
    <div>Hello</div>
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
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <Textarea
          label="Feedback"
          name="feedback"
          type="text"
          placeholder="Enter your feedback message here"
        />
        <div className={style.wrapper}>
          <Error className={style.error} errorText={responseText} />
          <Button
            className={style.button}
            type="submit"
            buttonText="Send feedback"
          />
        </div>
      </Form>
    </Formik>
  )
}
