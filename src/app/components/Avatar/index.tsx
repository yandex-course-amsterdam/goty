import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { StoreState } from 'app/reducers'

import style from './style.css'

interface IProps {
  className?: string
}

export const Avatar: FC<IProps> = ({ className }): JSX.Element => {
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const userAvatar = userInfo.avatar
    ? `https://ya-praktikum.tech/${userInfo.avatar}`
    : '/images/avatar.png'

  const avatarName = userInfo.displayName || 'Top game'

  return (
    <div className={cn(style.avatar, className)}>
      <img className={style.image} src={userAvatar} alt={avatarName} />
      <h1 className={style.title}>{avatarName}</h1>
    </div>
  )
}
