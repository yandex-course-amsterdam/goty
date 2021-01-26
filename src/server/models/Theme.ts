import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

const hexColorRegexp = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i
const hexColorValidator = (value: string) => {
  if (!value.match(hexColorRegexp)) {
    throw new Error('Color is not hex formatted')
  }
}

export class Theme extends Model {
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
    articleBgColor: { type: DataType.STRING, validate: { hexColorValidator } },
    subTextColor: { type: DataType.STRING, validate: { hexColorValidator } }
  },
  { sequelize, tableName: 'themes' }
)
