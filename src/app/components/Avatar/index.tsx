import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { StoreState } from 'app/reducers'

import defaultAvatar from 'images/avatar.png'

import style from './style.css'

interface IProps {
  className?: string
}

export const Avatar: FC<IProps> = ({ className }): JSX.Element => {
  const userInfo = useSelector((state: StoreState) => state.userInfo)

  const userAvatar = userInfo.avatar
    ? `https://ya-praktikum.tech/${userInfo.avatar}`
    : defaultAvatar

  const avatarName = userInfo.display_name || 'Top game'

  return (
    <div className={cn(style.avatar, className)}>
      <img className={style.image} src={userAvatar} alt={avatarName} />
      <h1 className={style.title}>{avatarName}</h1>
    </div>
  )
}
