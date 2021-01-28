import React, { FC, useState, useCallback } from 'react'
import { Button, Error, Input, Textarea } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { sendFeedback } from 'app/api/Api'
import { VALIDATION_SCHEMA } from 'app/constants'
import { displayResponseText } from 'app/utils'

import style from './style.css'

const { login, email } = VALIDATION_SCHEMA
const initialValues = { login: '', email: '', feedback: '' }
const validationSchema = Yup.object({ login, email })

export const FeedbackForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const [isFeedbackSent, setIsFeedbackSent] = useState(false)

  const sendUserFeedback = useCallback(async (data: FormikValues): Promise<
    void
  > => {
    try {
      await sendFeedback(data)

      setIsFeedbackSent(true)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }, [])

  const handleSubmit = useCallback(
    (values: FormikValues, { setSubmitting }: FormikValues) => {
      sendUserFeedback(values)
      setSubmitting(false)
    },
    [sendUserFeedback]
  )

  return isFeedbackSent ? (
    <div className={style.feedbackSuccess}>
      <span role="img" aria-label="ok">
        👌
      </span>
      We have received your feedback and will get back to you shortly.
      <br />
      Have a nice day!
    </div>
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
