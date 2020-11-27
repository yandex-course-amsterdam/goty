import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { UserInfo } from 'app/actions'

import style from './style.css'

type AvatarProps = {
  className?: string
}

export const Avatar = ({ className }: AvatarProps): ReactElement => {
  const avatar = useSelector(
    (state: { userInfo: UserInfo }) => state.userInfo.avatar
  )
  const name = useSelector(
    (state: { userInfo: UserInfo }) => state.userInfo.display_name
  )

  const userAvatar = avatar
    ? `https://ya-praktikum.tech/${avatar}`
    : 'https://i.imgur.com/Cbyhdku.png'

  const avatarName = name || 'Top game'

  return (
    <div className={cn(style.avatar, className)}>
      <img className={style.image} src={userAvatar} alt={avatarName} />
      <h1 className={style.title}>{avatarName}</h1>
    </div>
  )
}
