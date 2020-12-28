import jwt from 'jsonwebtoken'

const SECRET_KEY = 'her'

export const createToken = (userLogin: string): string =>
  jwt.sign({ login: userLogin }, SECRET_KEY)
