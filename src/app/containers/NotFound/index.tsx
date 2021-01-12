import React, { FC, useState } from 'react'
import { Redirect } from 'react-router-dom'

import {
  Avatar,
  Button,
  Description,
  Main,
  Sidebar,
  Title
} from 'app/components'

import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'

import style from './style.css'

const {
  mainTitle,
  mainDescriptionSubtitle,
  mainDescriptionTitle
} = TRANSLATIONS

export const NotFound: FC = (): JSX.Element => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }

  return isButtonClicked ? (
    <Redirect to={route.game} />
  ) : (
    <div className={style.notFound}>
      <Sidebar>
        <Avatar className={style.avatar} />
      </Sidebar>
      <Main>
        <div className={style.container}>
          <div>
            <Title className={style.title} title={mainTitle} />
          </div>
          <div className={style.overflow}>
            <Description
              className={style.description}
              title={mainDescriptionTitle}
              subtitle={mainDescriptionSubtitle}
            />
            <div className={style.group}>
              <hr />
              <Button
                handleClick={handleClick}
                className={style.button}
                buttonText="Go back"
              />
            </div>
          </div>
        </div>
      </Main>
    </div>
  )
}
