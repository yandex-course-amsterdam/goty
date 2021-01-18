import { config } from '../config'

import { Theme } from './Theme'
import { UserTheme } from './UserTheme'

const {
  models: { aliases }
} = config

Theme.hasOne(UserTheme, { foreignKey: 'themeId', as: aliases.Theme })
UserTheme.belongsTo(Theme, { foreignKey: 'themeId', as: aliases.UserTheme })

export { Theme, UserTheme }
