import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

export class News extends Model {}

News.init(
  {
    id: { primaryKey: true, type: DataType.INTEGER },
    title: { type: DataType.STRING },
    description: { type: DataType.STRING }
  },
  { sequelize, tableName: 'news' }
)
