import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class User extends Model {}

User.init(
  {
    first_name: { type: DataType.STRING },
    second_name: { type: DataType.STRING },
    display_name: { type: DataType.STRING },
    login: { type: DataType.STRING },
    email: { type: DataType.STRING },
    phone: { type: DataType.STRING },
    avatar: { type: DataType.STRING }
  },
  { sequelize, tableName: 'users', underscored: true }
)
