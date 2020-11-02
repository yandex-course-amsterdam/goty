import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type DescriptionProps = {
  title: string
  subtitle: string
  className: string | undefined
}

export const Description = ({ title, subtitle, className }: DescriptionProps): ReactElement => {
  return (
    <div className={cn(style.container, className)}>
      <p className={style.title}>{title}</p>
      <p className={style.subtitle}>{subtitle}</p>
    </div>
  )
}
