import React, { ChangeEvent, ReactElement } from 'react'

import style from './style.css'

type FormInputProps = {
  type: string | undefined
  id: string
  placeholder: string
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({ id, type, value, placeholder, handleChange, ...props }: FormInputProps): ReactElement => {
  return (
    <input
      id={id}
      className={style.input}
      type={type || 'text'}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      {...props}
    />
  )
}
