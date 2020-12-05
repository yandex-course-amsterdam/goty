import React, { FC } from 'react'

import cn from 'classnames'

import style from './style.css'

interface IProps {
  children?: React.ReactNode
  className?: string
}

export const List: FC<IProps> = ({ children, className }): JSX.Element => (
  <ul className={cn(style.list, className)}>{children}</ul>
)
