import jwt from 'jsonwebtoken'

const SECRET_KEY = 'her'

// Сейчас это неполная авторизация через jwt-токены, так как verify происходит по секретному ключу и два разных валидных токена дадут одинаковый положительный результат
// Ждём базу из 8-го спринта, очевидно

export const verifyToken = (token: string): string =>
  jwt.verify(token, SECRET_KEY) as string
