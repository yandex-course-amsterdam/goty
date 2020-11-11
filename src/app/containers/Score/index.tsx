import React, { ReactElement } from 'react'
import { NavLink, useRouteMatch, Switch, Route, Link } from 'react-router-dom'
import {
  Avatar,
  Item,
  List,
  Navigation,
  Sidebar,
  SubNavigation,
  Title,
  Main,
  Description,
  UserScore
} from 'app/components'

import { ExitIcon, GameIcon, ScoreIcon, UserIcon } from 'icons'
import { DATA } from './data'
import { USER_SCORE_DATA } from './userScoreData'

import style from './style.css'

type userScoreData = {
  name: string
  score: number
  id: number
}

const sortUserData = (data: userScoreData[]): userScoreData[] => {
  return data.sort((a: userScoreData, b: userScoreData) => b.score - a.score)
}

export const Score = (): ReactElement => {
  const { path, url } = useRouteMatch()
  const { mainTitle, mainDescriptionTitle, mainDescriptionSubtitle } = DATA

  return (
    <div className={style.score}>
      <Sidebar>
        <Avatar
          avatar="https://i.imgur.com/Cbyhdku.png"
          name="Top game"
          className={style.avatar}
        />
        <Navigation title="Options">
          <List className={style.list}>
            <Link className={style.link} to="/game">
              <Item text="Game">
                <GameIcon />
              </Item>
            </Link>
            <Link className={style.link} to="/profile/details">
              <Item text="Profile">
                <UserIcon />
              </Item>
            </Link>
            <Item text="Score" active>
              <ScoreIcon />
            </Item>
            <Item className={style.exit} text="Exit">
              <ExitIcon />
            </Item>
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
                to={`${url}/leaderboard`}
              >
                Leaderboard
              </NavLink>
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}/personal-stats`}
              >
                Personal stats
              </NavLink>
            </SubNavigation>
          </div>
          <Switch>
            <Route exact path={`${path}/leaderboard`}>
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
                <div className={style.overflow}>
                  {sortUserData(USER_SCORE_DATA).map(
                    ({ id, score, name }, index, array) => {
                      const width = `${
                        index === 0
                          ? 100
                          : (array[index].score / array[0].score) * 100
                      }%`

                      return (
                        <UserScore
                          key={id}
                          score={score}
                          name={name}
                          width={width}
                        />
                      )
                    }
                  )}
                </div>
              </div>
            </Route>
            <Route exact path={`${path}/personal-stats`}>
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
