import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { UserDataState } from 'app/reducers/userDataReducer'
import style from './style.css'

type AvatarProps = {
  className?: string
}

export const Avatar = ({ className }: AvatarProps): ReactElement => {
  const avatar = useSelector(
    (state: { userData: UserDataState }) => state.userData.avatar
  )
  const name = useSelector(
    (state: { userData: UserDataState }) => state.userData.display_name
  )

  return (
    <div className={cn(style.avatar, className)}>
      <img
        className={style.image}
        src={
          avatar
            ? `https://ya-praktikum.tech/${avatar}`
            : 'https://i.imgur.com/Cbyhdku.png'
        }
        alt={name || 'Top game'}
      />
      <h1 className={style.title}>{name || 'Top game'}</h1>
    </div>
  )
}
