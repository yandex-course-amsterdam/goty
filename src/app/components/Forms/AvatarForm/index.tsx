import React, { FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Error } from 'app/components'
import { Formik, FormikValues } from 'formik'
import * as Yup from 'yup'

import { updateAvatar } from 'app/api/Api'
import { fetchUserInfo } from 'app/actions'
import { displayResponseText } from 'app/utils'

import style from './style.css'

export const AvatarForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const dispatch = useDispatch()

  const initialValues = { avatar: null }
  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed().required()
  })

  const updateUserAvatar = async (values: FormikValues): Promise<void> => {
    try {
      const data = new FormData()
      data.append('avatar', values.avatar)
      await updateAvatar(data)
      await dispatch(fetchUserInfo())
      displayResponseText(setResponseText)
    } catch (error) {
      displayResponseText(error.response.data.reason)
    }
  }

  const onSubmit = async (values: FormikValues) => {
    await updateUserAvatar(values)
  }

  const renderForm = ({ handleSubmit, setFieldValue }: FormikValues) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget.files !== null) {
        setFieldValue('avatar', event.currentTarget.files[0])
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="file">
          Update Avatar
        </label>
        <input
          id="avatar"
          name="avatar"
          type="file"
          onChange={handleChange}
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
      </form>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={renderForm}
    />
  )
}
