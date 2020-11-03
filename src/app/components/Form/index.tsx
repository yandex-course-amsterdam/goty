import React, { ChangeEvent, FormEvent, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { Button, Error, Label, Input } from 'app/components'

import { ERRORS } from 'app/constants'

import { Validation } from 'app/utils'
import * as status from 'app/utils/setValidationStatus'

import style from './style.css'

type FormSignUpProps = {
  formName: string
  handler: (event: FormEvent) => Promise<void>
  buttonType: 'button' | 'submit'
  buttonText: string
  formData: { id: string; labelText: string; type: string; name: string; placeholder: string; pattern: string }[]
}

export const Form = ({ formName, handler, buttonText, buttonType, formData }: FormSignUpProps): ReactElement => {
  const [formValidation, setFormValidation] = useState<Validation | undefined>(undefined)

  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  useEffect(() => {
    setFormValidation(new Validation(ERRORS, formRef.current, status))
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    formValidation?.validate(e)
  }

  return (
    <form ref={formRef} id={formName} onSubmit={handler} noValidate>
      {formData.map(({ id, labelText, type, placeholder, name, ...props }) => (
        <div key={labelText} className={style.container}>
          <Label className={style.label} id={id} labelText={labelText} />
          <div>
            <Input name={name} type={type} id={id} handleChange={handleChange} placeholder={placeholder} {...props} />
            <Error name={name} />
          </div>
        </div>
      ))}
      <hr />
      <div className={style.wrapper}>
        <Error className={style.error} name="api_error" />
        <Button className={style.button} type={buttonType} buttonText={buttonText} />
      </div>
    </form>
  )
}
