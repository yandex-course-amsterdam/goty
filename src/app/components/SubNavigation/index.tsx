import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useRouteMatch } from 'react-router-dom'

import { StoreState } from 'app/reducers'
import { route } from 'app/enums'
import style from './style.css'

interface IProps {
  title?: string
}

export const SubNavigation: FC<IProps> = ({ title }): JSX.Element => {
  const { path, url } = useRouteMatch()
  const oauthStatus = useSelector((state: StoreState) => state.oauthStatus)
  const isPathProfile = path === route.profile
  const isPathScore = path === route.score

  return (
    <>
      {title && <p className={style.title}>{title}</p>}
      <nav className={style.nav}>
        {isPathProfile && (
          <>
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
            {!oauthStatus.status && (
              <NavLink
                className={style.sublink}
                activeClassName={style.active}
                to={`${url}${route.password}`}
              >
                Password
              </NavLink>
            )}
            <NavLink
              className={style.sublink}
              activeClassName={style.active}
              to={`${url}${route.theme}`}
            >
              Theme
            </NavLink>
          </>
        )}
        {isPathScore && (
          <>
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
          </>
        )}
      </nav>
    </>
  )
}
