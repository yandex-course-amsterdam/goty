import React, { FC } from 'react'

import style from './style.css'

interface IProps {
  score: number
  name: string
  width: string
}

export const UserScore: FC<IProps> = ({ score, name, width }): JSX.Element => {
  return (
    <div className={style.user}>
      <p className={style.name}>{name}</p>
      <div className={style.points} style={{ flexBasis: width }}>
        {score}
      </div>
    </div>
  )
}
