import React, { FC, useState } from 'react'
import { Redirect } from 'react-router-dom'
import cn from 'classnames'

import { logout, invalidateToken } from 'app/api/Api'
import { route } from 'app/enums'

import style from './style.css'

interface IProps {
  children: React.ReactNode
  className?: string
}

export const ExitButton: FC<IProps> = ({
  children,
  className
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleExit = async () => {
    try {
      await logout()
      await invalidateToken()
      setIsLoggedIn(false)
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
