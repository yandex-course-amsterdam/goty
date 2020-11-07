import { FormEvent } from 'react'

import { Validation } from 'app/utils/Validation'
import { getDataOnSubmit } from 'app/utils/getDataOnSubmit'
import * as status from 'app/utils/setValidationStatus'

import { ERRORS } from 'app/constants'

import { authApi } from 'app/api'

export const handleLoadReg = async (event: FormEvent): Promise<void> => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  const apiError = form.querySelector('#api_error')

  const validation = new Validation(ERRORS, form, status)

  const formData = getDataOnSubmit(validation, form.id)

  if (formData.status) {
    try {
      const res = await authApi.signUp(JSON.stringify(formData.data))

      if (res.status === 200) {
        console.log('Рега прошла, можно куда-то переходить')
      } else if (res.status !== 200 && apiError) {
        apiError.textContent = JSON.parse(res.response).reason

        setTimeout(() => {
          apiError.textContent = ''
        }, 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
