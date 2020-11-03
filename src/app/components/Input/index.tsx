import React, { ChangeEvent, ReactElement } from 'react'
import { ReactSVG } from 'react-svg'

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
      <ReactSVG src="../../../images/wrong.svg" wrapper="span" className={style.wrong} id="wrong" />
      <ReactSVG src="../../../images/correct.svg" wrapper="span" className={style.correct} id="correct" />
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
