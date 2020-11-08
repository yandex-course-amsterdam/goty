import React, { ReactElement } from 'react'
import { Avatar, Description, Form, Item, List, Main, Navigation, Sidebar, Title, SubNavigation } from 'app/components'
import { Link, useRouteMatch, Route, NavLink, Switch } from 'react-router-dom'

import { FORM_DATA } from 'app/constants'
import { getUserInfo, handleUpdateUserInfo, handleUpdateUserPassword, handleLoadAvatar } from 'app/utils'

import { DATA } from './data'

import style from './style.css'

export const Profile = (): ReactElement => {
  const { path, url } = useRouteMatch()
  const { mainTitle, mainDescriptionSubtitle, mainDescriptionTitle, detailsForm, passwordForm, pictureForm } = DATA
  const { name, email, login, phone, surname, displayName, oldPassword, newPassword, profilePicture } = FORM_DATA

  return (
    <div className={style.profile}>
      <Sidebar>
        <Avatar avatar="https://i.imgur.com/Cbyhdku.png" name="Top game" className={style.avatar} />
        <Navigation title="Options">
          <List className={style.list}>
            <Link className={style.link} to="/game">
              <Item src="../../images/game.svg" text="Game" />
            </Link>
            <Item src="../../images/user.svg" text="Profile" active />
            <Link className={style.link} to="/score/leaderboard">
              <Item src="../../images/score.svg" text="Score" />
            </Link>
            <Item className={style.exit} src="../../images/exit.svg" text="Exit" />
          </List>
        </Navigation>
      </Sidebar>
      <Main>
        <div className={style.container}>
          <div>
            <Title className={style.title} title={mainTitle} />
            <SubNavigation title="Account">
              <NavLink className={style.sublink} activeClassName={style.active} to={`${url}/details`}>
                Details
              </NavLink>
              <NavLink className={style.sublink} activeClassName={style.active} to={`${url}/picture`}>
                Picture
              </NavLink>
              <NavLink className={style.sublink} activeClassName={style.active} to={`${url}/password`}>
                Password
              </NavLink>
            </SubNavigation>
          </div>
          <Switch>
            <Route exact path={`${path}/details`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <Form
                  getData={getUserInfo}
                  handler={handleUpdateUserInfo}
                  formData={[name, surname, displayName, login, email, phone]}
                  formName={detailsForm}
                  buttonText="Update Profile"
                  buttonType="submit"
                />
              </div>
            </Route>
            <Route exact path={`${path}/picture`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <Form
                  handler={handleLoadAvatar}
                  formData={[profilePicture]}
                  formName={pictureForm}
                  buttonText="Update Avatar"
                  buttonType="submit"
                />
              </div>
            </Route>
            <Route exact path={`${path}/password`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <Form
                  handler={handleUpdateUserPassword}
                  formData={[oldPassword, newPassword]}
                  formName={passwordForm}
                  buttonText="Update Password"
                  buttonType="submit"
                />
              </div>
            </Route>
          </Switch>
        </div>
      </Main>
    </div>
  )
}
