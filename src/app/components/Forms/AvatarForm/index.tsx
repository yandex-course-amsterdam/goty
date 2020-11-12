import React, { ReactElement, useState } from 'react'
import { Button, Error } from 'app/components'
import { Formik, FormikValues } from 'formik'
import * as Yup from 'yup'

import { userApi } from 'app/api'
import { checkResponseStatus } from 'app/utils'

import style from './style.css'

export const AvatarForm = (): ReactElement => {
  const [responseText, setResponseText] = useState('')

  const updateUserAvatar = async (values: FormikValues): Promise<void> => {
    const data = new FormData()
    data.append('avatar', values.avatar)

    try {
      const res = await userApi.updateAvatar(data)

      checkResponseStatus(res, setResponseText)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={{ avatar: null }}
      onSubmit={async (values) => {
        await updateUserAvatar(values)
      }}
      validationSchema={Yup.object().shape({
        avatar: Yup.mixed().required()
      })}
      render={({ handleSubmit, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <label className={style.label} htmlFor="file">
              Update Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files !== null) {
                  setFieldValue('avatar', event.currentTarget.files[0])
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
          </form>
        )
      }}
    />
  )
}
