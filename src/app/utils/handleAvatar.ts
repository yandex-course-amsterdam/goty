import { FormEvent } from 'react'

import { userApi } from 'app/api'

export const handleAvatar = async (event: FormEvent): Promise<void> => {
  event.preventDefault()

  const form = event.target as HTMLFormElement

  const apiText = form.querySelector('#api_error')

  const formData = new FormData(form)

  if (formData) {
    try {
      const res = await userApi.updateAvatar(formData)

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
