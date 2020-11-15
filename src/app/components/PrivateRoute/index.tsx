import React, { ReactElement, ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ROUTES } from 'app/constants'

type PrivateRouteProps = {
  path: string
  children: ReactNode
}

export const PrivateRoute = ({
  path,
  children
}: PrivateRouteProps): ReactElement => {
  const dataStatus = useSelector(
    (state: { dataStatus: string }) => state.dataStatus
  )

  return dataStatus === 'success' ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to={ROUTES.SIGN_IN} />
  )
}
