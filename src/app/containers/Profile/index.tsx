import React, { FC } from 'react'
import {
  Avatar,
  Description,
  ListItem,
  List,
  Main,
  Navigation,
  Sidebar,
  Title,
  SubNavigation,
  DetailsForm,
  PasswordForm,
  AvatarForm,
  ExitButton
} from 'app/components'
import { Link, useRouteMatch, Route, NavLink, Switch } from 'react-router-dom'

import { ExitIcon, GameIcon, ScoreIcon, UserIcon } from 'icons'
import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'

import style from './style.css'

const {
  mainTitle,
  mainDescriptionSubtitle,
  mainDescriptionTitle
} = TRANSLATIONS

export const Profile: FC = (): JSX.Element => {
  const { path, url } = useRouteMatch()

  return (
    <div className={style.profile}>
      <Sidebar>
        <Avatar className={style.avatar} />
        <Navigation title="Options">
          <List className={style.list}>
            <Link className={style.link} to={route.game}>
              <ListItem text="Game">
                <GameIcon />
              </ListItem>
            </Link>
            <ListItem text="Profile" active>
              <UserIcon />
            </ListItem>
            <Link className={style.link} to={route.scoreLeaderboard}>
              <ListItem text="Score">
                <ScoreIcon />
              </ListItem>
            </Link>
            <ExitButton className={style.exit}>
              <ListItem text="Exit">
                <ExitIcon />
              </ListItem>
            </ExitButton>
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <div className={style.container}>
          <div>
            <Title className={style.title} title={mainTitle} />
            <SubNavigation title="Account">
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.details}`}
              >
                Details
              </NavLink>
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.picture}`}
              >
                Picture
              </NavLink>
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.password}`}
              >
                Password
              </NavLink>
            </SubNavigation>
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
          </Switch>
        </div>
      </Main>
    </div>
  )
}
