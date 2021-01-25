import { config } from '../config'

import { User } from './User'
import { Theme } from './Theme'
import { News } from './News'
import { Comment } from './Comment'
import { Feedback } from './Feedback'

const {
  models: { aliases }
} = config

Theme.hasMany(User, {
  foreignKey: 'themeId'
})
User.belongsTo(Theme, {
  foreignKey: 'themeId',
  as: aliases.theme
})

News.hasMany(Comment, {
  foreignKey: 'newsId',
  as: aliases.comments
})
Comment.belongsTo(News, {
  foreignKey: 'newsId'
})

User.hasMany(Comment, {
  foreignKey: 'id',
  as: aliases.user
})
Comment.belongsTo(User, {
  foreignKey: 'id',
  as: aliases.user
})

export { User, Theme, Feedback, News, Comment }
