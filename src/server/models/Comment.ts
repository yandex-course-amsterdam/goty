import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class Comment extends Model {}

Comment.init(
  {
    id: { primaryKey: true, type: DataType.INTEGER },
    text: { type: DataType.STRING }
  },
  { sequelize, tableName: 'comments' }
)
