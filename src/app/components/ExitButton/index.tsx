import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import cn from 'classnames'

import { logout, invalidateToken } from 'app/api/Api'
import { route } from 'app/enums'
import { setLoginStatus } from 'app/actions'

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
  const dispatch = useDispatch()

  const handleExit = async () => {
    try {
      await logout()
      await invalidateToken()
      dispatch(setLoginStatus(false))
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
