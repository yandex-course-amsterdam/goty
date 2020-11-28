import React, { ReactElement, useState } from 'react'
import { Redirect } from 'react-router-dom'
import cn from 'classnames'

import { authApi } from 'app/api'
import { route } from 'app/enums'

import style from './style.css'

type ExitButtonProps = {
  children: React.ReactNode
  className?: string
}

export const ExitButton = ({
  children,
  className
}: ExitButtonProps): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleExit = async () => {
    try {
      const res = await authApi.logout()

      if (res.status === 200) {
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return isLoggedIn ? (
    <button
      type="button"
      className={cn(style.button, className)}
      onClick={handleExit}
    >
      {children}
    </button>
  ) : (
    <Redirect to={route.signIn} />
  )
}
