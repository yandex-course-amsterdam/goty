import { Model, DataType } from 'sequelize-typescript'

import { config } from '../config'

import { sequelize } from '../sequelize'
// Вылезли циклические зависимости, но кажется, что так красивее, чем настраивать связи в индексе
// eslint-disable-next-line
import { UserTheme } from './UserTheme'

const {
  models: { aliases }
} = config

const hexColorRegexp = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i
const hexColorValidator = (value: string) => {
  if (!value.match(hexColorRegexp)) {
    throw new Error('Color is not hex formatted')
  }
}

class Theme extends Model {
  baseColor!: string
}

Theme.init(
  {
    name: { type: DataType.STRING },
    default: { type: DataType.BOOLEAN },
    baseColor: { type: DataType.STRING, validate: { hexColorValidator } },
    secondColor: { type: DataType.STRING, validate: { hexColorValidator } },
    fieldColor: { type: DataType.STRING, validate: { hexColorValidator } },
    accentColor: { type: DataType.STRING, validate: { hexColorValidator } },
    textColor: { type: DataType.STRING, validate: { hexColorValidator } },
    subTextColor: { type: DataType.STRING, validate: { hexColorValidator } }
  },
  { sequelize, tableName: 'themes' }
)

Theme.hasOne(UserTheme, { foreignKey: 'themeId', as: aliases.Theme })

export { Theme }
