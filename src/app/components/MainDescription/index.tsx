import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type MainDescriptionProps = {
  title: string
  subtitle: string
  className: string | undefined
}

export const MainDescription = ({ title, subtitle, className }: MainDescriptionProps): ReactElement => {
  return (
    <div className={cn(style.container, className)}>
      <p className={style.title}>{title}</p>
      <p className={style.subtitle}>{subtitle}</p>
    </div>
  )
}
