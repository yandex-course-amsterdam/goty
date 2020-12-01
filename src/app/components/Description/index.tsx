import React, { FC } from 'react'
import cn from 'classnames'

import style from './style.css'

interface IProps {
  title: string
  subtitle: string
  className?: string
}

export const Description: FC<IProps> = ({
  title,
  subtitle,
  className
}): JSX.Element => (
  <div className={cn(style.container, className)}>
    <p className={style.title}>{title}</p>
    <p className={style.subtitle}>{subtitle}</p>
  </div>
)
