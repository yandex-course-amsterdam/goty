import jwt from 'jsonwebtoken'

const SECRET_KEY = 'her'

export const createToken = (userId: number): string =>
  jwt.sign({ id: userId }, SECRET_KEY)
