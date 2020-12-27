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
  const loginStatus = useSelector((state: StoreState) => state.loginStatus)

  return loginStatus.status ? (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  ) : (
    <Redirect to={route.signIn} />
  )
}
