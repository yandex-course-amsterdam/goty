import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class Comment extends Model {}

Comment.init(
  {
    text: { type: DataType.STRING }
  },
  { sequelize, tableName: 'comments', underscored: true }
)
