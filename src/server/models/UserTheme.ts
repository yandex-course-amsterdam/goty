import { Model, DataType } from 'sequelize-typescript'

import { config } from '../config'

import { sequelize } from '../sequelize'
// Вылезли циклические зависимости, но кажется, что так красивее, чем настраивать связи в индексе
// eslint-disable-next-line
import { Theme } from './Theme'

const {
  models: { aliases }
} = config

class UserTheme extends Model {}

UserTheme.init(
  {
    userId: { primaryKey: true, type: DataType.INTEGER }
  },
  { sequelize, tableName: 'users-themes' }
)

UserTheme.belongsTo(Theme, { foreignKey: 'themeId', as: aliases.UserTheme })

export { UserTheme }
