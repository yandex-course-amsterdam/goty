import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class UserTheme extends Model {}

UserTheme.init(
  {
    userId: { primaryKey: true, type: DataType.INTEGER.UNSIGNED }
  },
  { sequelize, tableName: 'users-themes' }
)
