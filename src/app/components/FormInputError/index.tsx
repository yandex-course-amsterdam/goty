import React, { ReactElement } from 'react'

import style from './style.css'

type FormInputErrorProps = {
  errorText: string
}

export const FormInputError = ({ errorText }: FormInputErrorProps): ReactElement => {
  return <p className={style.error}>{errorText}</p>
}
