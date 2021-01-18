import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  username: 'gotyuser',
  password: 'gotypass',
  database: 'gotydb',

  dialect: 'postgres'
})
