import React, { ReactElement } from 'react'

import cn from 'classnames'

import style from './style.css'

type ListProps = {
  children?: React.ReactNode
  className?: string
}

export const List = ({ children, className }: ListProps): ReactElement => {
  return <ul className={cn(style.list, className)}>{children}</ul>
}
