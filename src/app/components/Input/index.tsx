import React, { FC } from 'react'
import cn from 'classnames'
import { useField } from 'formik'

import { CorrectIcon, WrongIcon } from 'icons'

import style from './style.css'

interface IProps {
  label?: string
  type?: string
  id?: string
  placeholder?: string
  name: string
}

export const Input: FC<IProps> = ({ label, ...props }): JSX.Element => {
  const [field, meta] = useField(props)
  const { id, name } = props

  const getInputBorderStyle = (): string => {
    if (!meta.error && field.value.length !== 0) {
      return style.correctinput
    }

    if (meta.touched && (field.value.length === 0 || meta.error)) {
      return style.wronginput
    }

    if (!meta.touched) {
      return ''
    }

    return style.correctinput
  }

  const setInputIcon = (): JSX.Element | null => {
    if (!meta.error && field.value.length !== 0) {
      return <CorrectIcon className={style.icon} />
    }

    if (meta.touched && (field.value.length === 0 || meta.error)) {
      return <WrongIcon className={style.icon} />
    }

    if (!meta.touched) {
      return null
    }

    return <WrongIcon className={style.icon} />
  }

  return (
    <div className={style.wrapper}>
      <label className={style.label} htmlFor={id || name}>
        {label}
      </label>
      <div>
        <div>
          <input
            className={cn(style.input, getInputBorderStyle())}
            {...field}
            {...props}
          />
          {setInputIcon()}
        </div>
        {meta.touched && meta.error ? (
          <div className={style.error}>{meta.error}</div>
        ) : (
          <div className={style.error} />
        )}
      </div>
    </div>
  )
}
