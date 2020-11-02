import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type TitleProps = {
  title: string
  className?: string
}

export const Title = ({ title, className }: TitleProps): ReactElement => {
  return <h2 className={cn(style.title, className)}>{title}</h2>
}
