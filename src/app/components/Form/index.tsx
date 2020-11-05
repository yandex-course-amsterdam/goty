import React, { ChangeEvent, FormEvent, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react'
import { Button, Error, Label, Input } from 'app/components'

import { ERRORS } from 'app/constants'

import { Validation } from 'app/utils'
import * as status from 'app/utils/setValidationStatus'

import { PromiseInterface } from 'app/interfaces/promise'

import style from './style.css'

type FormSignUpProps = {
  formName: string
  handler?: (event: FormEvent) => Promise<void>
  getData?: () => Promise<PromiseInterface>
  buttonType: 'button' | 'submit'
  buttonText: string
  formData: { id: string; labelText: string; type: string; name: string; placeholder: string; pattern?: string }[]
}

const fillForm = (obj: Record<string, string>, form: MutableRefObject<HTMLFormElement>) => {
  const formElements = Array.from(form.current.elements)

  formElements.forEach((input) => {
    const inputElement = input as HTMLInputElement

    if (obj[inputElement.name]) {
      inputElement.value = obj[inputElement.name]
      inputElement.style.borderColor = '#87C289'

      const closestDiv = inputElement.closest('div') as HTMLElement
      const wrongIcon = closestDiv.querySelector('#wrong') as HTMLElement
      const correctIcon = closestDiv.querySelector('#correct') as HTMLElement

      if (closestDiv && wrongIcon && correctIcon) {
        wrongIcon.style.display = 'none'
        correctIcon.style.display = 'block'
      }
    }
  })

  formElements.slice(-1)[0].removeAttribute('disabled')
}

export const Form = ({
  formName,
  handler,
  buttonText,
  buttonType,
  formData,
  getData
}: FormSignUpProps): ReactElement => {
  const [formValidation, setFormValidation] = useState<Validation | undefined>(undefined)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  useEffect(() => {
    setFormValidation(new Validation(ERRORS, formRef.current, status))

    if (getData) {
      getData()
        .then((res) => JSON.parse(res.response))
        .then((res) => fillForm(res, formRef))
    }
  }, [getData])

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
