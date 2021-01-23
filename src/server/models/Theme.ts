import { Model, DataType } from 'sequelize-typescript'

import { sequelize } from '../sequelize'

// const hexColorRegexp = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i
// const hexColorValidator = (value: string) => {
//   if (!value.match(hexColorRegexp)) {
//     throw new Error('Color is not hex formatted')
//   }
// }

export class Theme extends Model {
  baseColor!: string
}

Theme.init(
  {
    name: { type: DataType.STRING },
    default: { type: DataType.BOOLEAN },
    baseColor: { type: DataType.STRING },
    secondColor: { type: DataType.STRING },
    fieldColor: { type: DataType.STRING },
    accentColor: { type: DataType.STRING },
    textColor: { type: DataType.STRING },
    subTextColor: { type: DataType.STRING }
  },
  { sequelize, tableName: 'themes' }
)
