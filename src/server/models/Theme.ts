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
    base_color: { type: DataType.STRING, validate: { hexColorValidator } },
    second_color: { type: DataType.STRING, validate: { hexColorValidator } },
    field_color: { type: DataType.STRING, validate: { hexColorValidator } },
    accent_color: { type: DataType.STRING, validate: { hexColorValidator } },
    text_color: { type: DataType.STRING, validate: { hexColorValidator } },
    article_bg_color: {
      type: DataType.STRING,
      validate: { hexColorValidator }
    },
    sub_text_color: { type: DataType.STRING, validate: { hexColorValidator } }
  },
  { sequelize, tableName: 'themes', underscored: true }
)
