import jwt from 'jsonwebtoken'

const SECRET_KEY = 'her'

export const verifyToken = (token: string): string =>
  jwt.verify(token, SECRET_KEY) as string
