import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class User extends Model {}

User.init(
  {
    userId: { primaryKey: true, type: DataType.INTEGER },
    name: { type: DataType.STRING }
  },
  { sequelize, tableName: 'users' }
)
