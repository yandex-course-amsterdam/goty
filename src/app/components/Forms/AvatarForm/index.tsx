import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Error } from 'app/components'
import { Formik, Form, FormikValues } from 'formik'
import * as Yup from 'yup'

import { updateAvatar } from 'app/api/Api'
import { fetchUserInfo } from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

const initialValues = { avatar: null }
const validationSchema = Yup.object().shape({
  avatar: Yup.mixed().required()
})

export const AvatarForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const dispatch = useDispatch()

  const updateUserAvatar = async (values: FormikValues): Promise<void> => {
    try {
      const data = new FormData()
      data.append('avatar', values.avatar)
      await updateAvatar(data)
      await dispatch(fetchUserInfo())
      displayResponseText(setResponseText)
    } catch (error) {
      displayResponseText(setResponseText, error.response.data.reason)
    }
  }

  const onSubmit = async (values: FormikValues) => {
    await updateUserAvatar(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <Form>
          <label className={style.label} htmlFor="file">
            Update Avatar
          </label>
          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={(event) => {
              if (event.currentTarget.files) {
                props.setFieldValue('avatar', event.currentTarget.files[0])
              }
            }}
            className={style.input}
          />
          <div className={style.wrapper}>
            <Error className={style.error} errorText={responseText} />
            <Button
              className={style.button}
              type="submit"
              buttonText="Update Avatar"
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}
