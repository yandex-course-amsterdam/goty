import { Theme } from './Theme'
import { UserTheme } from './UserTheme'

Theme.hasOne(UserTheme, { foreignKey: 'themeId' })
UserTheme.belongsTo(Theme, { foreignKey: 'themeId' })

export { Theme, UserTheme }
