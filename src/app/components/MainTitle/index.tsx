import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type MainTitleProps = {
  title: string
  className: string | undefined
}

export const MainTitle = ({ title, className }: MainTitleProps): ReactElement => {
  return <h2 className={cn(style.title, className)}>{title}</h2>
}
