import React, { ReactElement } from 'react'

import style from './style.css'

type UserScoreProps = {
  id: number
  score: number
  name: string
  width: string
}

export const UserScore = ({ id, score, name, width }: UserScoreProps): ReactElement => {
  return (
    <div key={id} className={style.user}>
      <p className={style.name}>{name}</p>
      <div className={style.points} style={{ flexBasis: width }}>
        {score}
      </div>
    </div>
  )
}
