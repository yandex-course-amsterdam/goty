import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Route, Switch } from 'react-router-dom'

import {
  Avatar,
  Description,
  Main,
  Navigation,
  Sidebar,
  Title,
  SubNavigation,
  DetailsForm,
  PasswordForm,
  AvatarForm
} from 'app/components'
import { StoreState } from 'app/reducers'
import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'

import style from './style.css'

const {
  mainTitle,
  mainDescriptionSubtitle,
  mainDescriptionTitle
} = TRANSLATIONS

export const Profile: FC = (): JSX.Element => {
  const { path } = useRouteMatch()
  const oauthStatus = useSelector((state: StoreState) => state.oauthStatus)

  return (
    <div className={style.profile}>
      <Sidebar>
        <Avatar className={style.avatar} />
        <Navigation />
      </Sidebar>
      <Main>
        <div className={style.container}>
          <div>
            <Title className={style.title} title={mainTitle} />
            <SubNavigation title="Account" />
          </div>
          <Switch>
            <Route exact path={`${path}${route.details}`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <DetailsForm />
              </div>
            </Route>
            <Route exact path={`${path}${route.picture}`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <AvatarForm />
              </div>
            </Route>
            {!oauthStatus.status && (
              <Route exact path={`${path}${route.password}`}>
                <div className={style.overflow}>
                  <Description
                    className={style.description}
                    title={mainDescriptionTitle}
                    subtitle={mainDescriptionSubtitle}
                  />
                  <PasswordForm />
                </div>
              </Route>
            )}
          </Switch>
        </div>
      </Main>
    </div>
  )
}
