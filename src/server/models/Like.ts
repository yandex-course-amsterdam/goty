import { Model, DataType } from 'sequelize-typescript'

import { LikeType } from 'shared'

import { sequelize } from '../sequelize'

export class Like extends Model {}

Like.init(
  {
    type: { type: DataType.ENUM(...Object.values(LikeType)) }
  },
  { sequelize, tableName: 'likes', underscored: true }
)
