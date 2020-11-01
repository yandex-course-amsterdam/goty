import React, { ChangeEvent, ReactElement, useRef, useState } from 'react'

import { FormInput, FormInputError } from 'app/components'
import style from 'app/components/FormInput/style.css'

type FormInputWithErrorProps = {
  type: string
  id: string
  placeholder: string
}

export const FormInputWithError = ({ type, id, placeholder, ...props }: FormInputWithErrorProps): ReactElement => {
  return (
    <>
      <FormInput type={type} id={id} placeholder={placeholder} {...props} />
      <FormInputError errorText="" />
    </>
  )
}
