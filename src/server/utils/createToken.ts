import jwt from 'jsonwebtoken'

const SECRET_KEY = 'her'

export const createToken = (user_login: string): string =>
  jwt.sign({ login: user_login }, SECRET_KEY)
