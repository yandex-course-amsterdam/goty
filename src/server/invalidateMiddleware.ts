import express from 'express'

export const invalidateMiddleware = (
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
