import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
  const dispatch = useDispatch()
  const history = useHistory()

  const handleExit = async () => {
    try {
      await logout()
      await invalidateToken()
      dispatch(setLoginStatus(false))
      history.push(route.signIn)

      // invalidate theme
      document.documentElement.removeAttribute('style')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      className={cn(style.button, className)}
      onClick={handleExit}
    >
      {children}
    </button>
  )
}
