import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class News extends Model {}

News.init(
  {
    title: { type: DataType.STRING },
    description: { type: DataType.STRING }
  },
  { sequelize, tableName: 'news', underscored: true }
)
