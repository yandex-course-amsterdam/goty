import express from 'express'

import { createToken } from '../utils'

export const createJWTToken = (
  req: express.Request,
  res: express.Response
): void => {
  const { user_login } = req.body

  if (!user_login) {
    res.status(401).send()
    return
  }

  const token = createToken(user_login)

  res.cookie('userToken', token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true
  })

  res.status(200).send()
}

export const invalidateToken = (
  req: express.Request,
  res: express.Response
): void => {
  res.cookie('userToken', '', {
    expires: new Date('1970'),
    httpOnly: true,
    secure: true
  })

  res.status(200).send()
}
