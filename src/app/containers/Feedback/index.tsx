import React, { FC } from 'react'
import {
  Avatar,
  Main,
  Description,
  Title,
  Navigation,
  Sidebar,
  FeedbackForm
} from 'app/components'

import { TRANSLATIONS } from './translations'

import style from './style.css'

const {
  mainTitle,
  mainDescriptionSubtitle,
  mainDescriptionTitle
} = TRANSLATIONS

export const Feedback: FC = (): JSX.Element => (
  <div className={style.signin}>
    <Sidebar>
      <Avatar className={style.avatar} />
      <Navigation />
    </Sidebar>
    <Main>
      <div className={style.container}>
        <Title className={style.title} title={mainTitle} />
        <div className={style.overflow}>
          <Description
            className={style.description}
            title={mainDescriptionTitle}
            subtitle={mainDescriptionSubtitle}
          />
          <FeedbackForm />
        </div>
      </div>
    </Main>
  </div>
)
