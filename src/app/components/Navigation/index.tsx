import React, { FC } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { Container, List, ListItem } from 'uikit/Navigation'
import { route } from 'app/enums'
import { ExitIcon, GameIcon, ScoreIcon, SettingsIcon, UserIcon } from 'icons'
import { ExitButton } from 'app/components'

import style from './style.css'

export const Navigation: FC = (): JSX.Element => {
  const { path } = useRouteMatch()
  const isAuthorized = path !== route.signUp && path !== route.signIn

  return (
    <Container title="Options">
      <List className={style.list}>
        {isAuthorized ? (
          <>
            <Link className={style.link} to={route.game}>
              <ListItem root={route.game} text="Game">
                <GameIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.profileDetails}>
              <ListItem root={route.profile} text="Profile">
                <UserIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.scoreLeaderboard}>
              <ListItem root={route.score} text="Score">
                <ScoreIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.feedback}>
              <ListItem root={route.feedback} text="Feedback">
                <ScoreIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.feed}>
              <ListItem root={route.feed} text="Feed">
                <ScoreIcon />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link className={style.link} to={route.signUp}>
              <ListItem root={route.signUp} text="Sign Up">
                <SettingsIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.signIn}>
              <ListItem root={route.signIn} text="Sign In">
                <UserIcon />
              </ListItem>
            </Link>
          </>
        )}
      </List>
      {isAuthorized && (
        <ExitButton className={style.exit}>
          <ListItem text="Exit">
            <ExitIcon />
          </ListItem>
        </ExitButton>
      )}
    </Container>
  )
}
