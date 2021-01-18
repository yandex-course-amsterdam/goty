import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'gotyuser',
  password: process.env.DB_PASSWORD || 'gotypass',
  database: process.env.DB_NAME || 'gotydb',

  dialect: 'postgres'
})
