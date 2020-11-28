import React, { FC, ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { route } from 'app/enums'
import { StoreState } from 'app/reducers'

interface IProps {
  path: string
  exact?: boolean
  children: ReactNode
}

export const PrivateRoute: FC<IProps> = ({
  exact,
  path,
  children
}): JSX.Element => {
  const userData = useSelector((state: StoreState) => state.userInfo)

  return userData.login ? (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  ) : (
    <Redirect to={route.signIn} />
  )
}
