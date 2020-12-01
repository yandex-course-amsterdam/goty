import React, { FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Error } from 'app/components'
import { Formik, FormikValues } from 'formik'
import * as Yup from 'yup'

import { userApi } from 'app/api'
import { fetchUserInfo } from 'app/actions'

import style from './style.css'

export const AvatarForm: FC = (): JSX.Element => {
  const [responseText, setResponseText] = useState('')
  const dispatch = useDispatch()

  const initialValues = { avatar: null }
  const validationSchema = Yup.object().shape({
    avatar: Yup.mixed().required()
  })

  const updateUserAvatar = async (values: FormikValues): Promise<void> => {
    const data = new FormData()
    data.append('avatar', values.avatar)

    try {
      const res = await userApi.updateAvatar(data)

      if (res.status === 200) {
        dispatch(fetchUserInfo())
        setResponseText('Successfully updated')
      } else {
        setResponseText(JSON.parse(res.response).reason)
      }
    } catch (error) {
      console.log(error)
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
