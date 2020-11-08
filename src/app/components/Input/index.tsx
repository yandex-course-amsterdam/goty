import React, { ChangeEvent, ReactElement } from 'react'

import WrongIcon from 'images/wrong.svg'
import CorrectIcon from 'images/correct.svg'

import style from './style.css'

type FormInputProps = {
  type?: string
  id: string
  placeholder: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const Input = ({ id, type, placeholder, handleChange, name, ...props }: FormInputProps): ReactElement => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrong} id="wrong">
        <WrongIcon />
      </div>
      <div className={style.correct} id="correct">
        <CorrectIcon />
      </div>
      <input
        name={name}
        id={id}
        className={style.input}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={handleChange}
        required
        {...props}
      />
    </div>
  )
}
