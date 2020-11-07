import { FormEvent } from 'react'

import { Validation } from 'app/utils/Validation'
import { getDataOnSubmit } from 'app/utils/getDataOnSubmit'
import * as status from 'app/utils/setValidationStatus'

import { ERRORS } from 'app/constants'

import { userApi } from 'app/api'

export const handleUpdateUserInfo = async (event: FormEvent): Promise<void> => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  const apiText = form.querySelector('#api_error')

  const validation = new Validation(ERRORS, form, status)

  const formData = getDataOnSubmit(validation, form.id)

  if (formData.status) {
    try {
      const res = await userApi.updateProfile(JSON.stringify(formData.data))

      if (res.status === 200 && apiText) {
        apiText.textContent = 'Successfully updated'
      } else if (res.status !== 200 && apiText) {
        apiText.textContent = JSON.parse(res.response).reason
      }
      setTimeout(() => {
        if (apiText) {
          apiText.textContent = ''
        }
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }
}
