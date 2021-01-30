import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import {
  Avatar,
  Navigation,
  Sidebar,
  SubNavigation,
  Title,
  Main,
  Description,
  UserScore
} from 'app/components'

import { StoreState } from 'app/reducers'
import { getLeaderboard } from 'app/api/Api'
import { route } from 'app/enums'
import { TRANSLATIONS } from './translations'

import style from './style.css'

interface userScoreData {
  name: string
  amsterdamScore: number
  id: number
}

interface userScoreElement {
  data: userScoreData
}

const {
  mainTitle,
  mainDescriptionTitle,
  mainDescriptionSubtitle
} = TRANSLATIONS

const sortUserData = (data: userScoreData[]) =>
  data
    .slice()
    .sort(
      (a: userScoreData, b: userScoreData) =>
        b.amsterdamScore - a.amsterdamScore
    )

const selectUserName = (state: StoreState) =>
  state.userInfo.displayName || state.userInfo.firstName

export const Score: FC = (): JSX.Element => {
  const [scoreData, setScoreData] = useState<userScoreData[]>([])
  const { path } = useRouteMatch()
  const userName = useSelector(selectUserName)

  useEffect(() => {
    async function fetchScoreData() {
      const res = await getLeaderboard()
      const data = res.data.map((score: userScoreElement) => score.data)

      setScoreData(data)
    }

    fetchScoreData()
  }, [])

  const renderUserScore = useCallback((): JSX.Element => {
    const sortedData = sortUserData(scoreData)
    const maxScore = sortedData.length ? sortedData[0].amsterdamScore : 0

    return (
      <>
        <div className={style.table}>
          <p className={style.header}>Name</p>
          <p className={style.header}>Score</p>
        </div>
        {sortedData.map((el: userScoreData, index: number) => {
          const { amsterdamScore, name } = el
          const width = `${
            index === 0 ? 100 : (amsterdamScore / maxScore) * 100
          }%`

          return (
            <UserScore
              key={name}
              score={amsterdamScore}
              name={name}
              width={width}
            />
          )
        })}
      </>
    )
  }, [scoreData])

  const renderPersonalStats = useCallback((): JSX.Element => {
    const userScore = scoreData.find((sc) => sc.name === userName)

    if (userScore) {
      const { name, amsterdamScore } = userScore
      return (
        <>
          <div className={style.table}>
            <p className={style.header}>Name</p>
            <p className={style.header}>Score</p>
          </div>
          <UserScore
            key={name}
            score={amsterdamScore}
            name={name}
            width="100%"
          />
        </>
      )
    }

    return <div className={style.noResult}>There is no score for you yet.</div>
  }, [scoreData, userName])

  return (
    <div className={style.score}>
      <Sidebar>
        <Avatar className={style.avatar} />
        <Navigation />
      </Sidebar>
      <Main>
        <div className={style.container}>
          <div>
            <Title className={style.title} title={mainTitle} />
            <SubNavigation title="Score details" />
          </div>
          <Switch>
            <Route exact path={`${path}${route.leaderboard}`}>
              <div className={style.group}>
                <Description
                  className={style.description}
                  title={mainDescriptionTitle}
                  subtitle={mainDescriptionSubtitle}
                />
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
                <div className={style.overflow}>{renderPersonalStats()}</div>
              </div>
            </Route>
          </Switch>
        </div>
      </Main>
    </div>
  )
}
