import { Validation } from 'app/utils/Validation'

import { errors } from 'app/constants'

import { FormEvent } from 'react'

import { getDataOnSubmit } from 'app/utils/get-data-on-submit'

import { authApi } from 'app/init/api'

export const handleReg = async (event: FormEvent): Promise<void> => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  const apiError = form.querySelector('#api_error')

  const validation = new Validation(errors, form.id)

  const formData = getDataOnSubmit(validation, form.id)

  if (formData.status) {
    try {
      const res = await authApi.signUp(JSON.stringify(formData.data))

      if (res.status === 200) {
        console.log('Рега прошла, можно куда-то переходить')
      } else {
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
