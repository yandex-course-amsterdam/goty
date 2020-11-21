import React, { ReactElement, ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTE } from 'app/constants'
import { UserDataState } from 'app/reducers/userDataReducer'

type PrivateRouteProps = {
  path: string
  exact?: boolean
  children: ReactNode
}

export const PrivateRoute = ({
  exact,
  path,
  children
}: PrivateRouteProps): ReactElement => {
  const userData = useSelector(
    (state: { userData: UserDataState }) => state.userData
  )

  return userData.login ? (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  ) : (
    <Redirect to={ROUTE.SIGN_IN} />
  )
}
