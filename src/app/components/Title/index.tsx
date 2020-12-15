import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  title: string
  className?: string
}

export const Title: FC<IProps> = ({ title, className }): JSX.Element => (
  <h2 className={cn(style.title, className)}>{title}</h2>
)
