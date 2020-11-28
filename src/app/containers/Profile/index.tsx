import React, { FC } from 'react'
import {
  Avatar,
  Description,
  Item,
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
import { DATA } from './data'

import style from './style.css'

const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle } = DATA

export const Profile: FC = (): JSX.Element => {
  const { path, url } = useRouteMatch()

  return (
    <div className={style.profile}>
      <Sidebar>
        <Avatar className={style.avatar} />
        <Navigation title="Options">
          <List className={style.list}>
            <Link className={style.link} to={route.game}>
              <Item text="Game">
                <GameIcon />
              </Item>
            </Link>
            <Item text="Profile" active>
              <UserIcon />
            </Item>
            <Link className={style.link} to={route.scoreLeaderboard}>
              <Item text="Score">
                <ScoreIcon />
              </Item>
            </Link>
            <ExitButton className={style.exit}>
              <Item text="Exit">
                <ExitIcon />
              </Item>
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
