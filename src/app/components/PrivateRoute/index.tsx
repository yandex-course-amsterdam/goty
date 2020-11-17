import React, { ReactElement, ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from 'app/constants'
import { UserDataState } from 'app/reducers/userDataReducer'

type PrivateRouteProps = {
  path: string
  children: ReactNode
}

export const PrivateRoute = ({
  path,
  children
}: PrivateRouteProps): ReactElement => {
  const userData = useSelector(
    (state: { userData: UserDataState }) => state.userData
  )

  return userData.login ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={ROUTES.SIGN_IN} />
  )
}
