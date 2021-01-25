import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class Like extends Model {}

Like.init(
  {
    type: { type: DataType.ENUM('like', 'laugh', 'cry', 'love') }
  },
  { sequelize, tableName: 'likes' }
)
