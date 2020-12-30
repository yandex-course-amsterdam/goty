import express from 'express'

import { createToken } from './utils'

export const authMiddleware = (
  req: express.Request,
  res: express.Response
): void => {
  const { userId } = req.body

  if (!userId) {
    res.status(401).send()
    return
  }

  const token = createToken(userId)

  res.cookie('userToken', token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: true
  })

  res.status(200).send()
}
