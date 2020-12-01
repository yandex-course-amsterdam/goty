import React, { FC } from 'react'
import { NavLink, useRouteMatch, Switch, Route, Link } from 'react-router-dom'
import {
  Avatar,
  ListItem,
  List,
  Navigation,
  Sidebar,
  SubNavigation,
  Title,
  Main,
  Description,
  UserScore,
  ExitButton
} from 'app/components'

import { ExitIcon, GameIcon, ScoreIcon, UserIcon } from 'icons'
import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'
import { USER_SCORE_DATA } from './userScoreData'

import style from './style.css'

interface userScoreData {
  name: string
  score: number
  id: number
}

const {
  mainTitle,
  mainDescriptionTitle,
  mainDescriptionSubtitle
} = TRANSLATIONS

const sortUserData = (data: userScoreData[]) =>
  data.sort((a: userScoreData, b: userScoreData) => b.score - a.score)

export const Score: FC = (): JSX.Element => {
  const { path, url } = useRouteMatch()

  const renderUserScore = () =>
    sortUserData(USER_SCORE_DATA).map(
      (
        { id, score, name }: userScoreData,
        index: number,
        array: userScoreData[]
      ) => {
        const width = `${
          index === 0 ? 100 : (array[index].score / array[0].score) * 100
        }%`

        return <UserScore key={id} score={score} name={name} width={width} />
      }
    )

  return (
    <div className={style.score}>
      <Sidebar>
        <Avatar className={style.avatar} />
        <Navigation title="Options">
          <List className={style.list}>
            <Link className={style.link} to={route.game}>
              <ListItem text="Game">
                <GameIcon />
              </ListItem>
            </Link>
            <Link className={style.link} to={route.profileDetails}>
              <ListItem text="Profile">
                <UserIcon />
              </ListItem>
            </Link>
            <ListItem text="Score" active>
              <ScoreIcon />
            </ListItem>
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
            <SubNavigation title="Score details">
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.leaderboard}`}
              >
                Leaderboard
              </NavLink>
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.personalStats}`}
              >
                Personal stats
              </NavLink>
            </SubNavigation>
          </div>
          <Switch>
            <Route exact path={`${path}${route.leaderboard}`}>
              <div className={style.group}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
                <div className={style.table}>
                  <p className={style.header}>Name</p>
                  <p className={style.header}>Score</p>
                </div>
                <div className={style.overflow}>{renderUserScore()}</div>
              </div>
            </Route>
            <Route exact path={`${path}${route.personalStats}`}>
              <div className={style.overflow}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
              </div>
            </Route>
          </Switch>
        </div>
      </Main>
    </div>
  )
}
