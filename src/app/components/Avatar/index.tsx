import React, { ReactElement } from 'react'
import cn from 'classnames'

import style from './style.css'

type AvatarProps = {
  avatar: string | undefined
  name: string | undefined
  className: string | undefined
}

export const Avatar = ({ avatar, name, className }: AvatarProps): ReactElement => {
  return (
    <div className={cn(style.avatar, className)}>
      <img className={style.image} src={avatar} alt={name} />
      <h1 className={style.title}>{name}</h1>
    </div>
  )
}
