import { config } from '../config'

import { User } from './User'
import { Theme } from './Theme'
import { News } from './News'
import { Comment } from './Comment'
import { Like } from './Like'
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
  foreignKey: 'userId',
  as: aliases.user
})
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: aliases.user
})

Theme.hasMany(Like, {
  foreignKey: 'themeId',
  as: aliases.likes
})
Like.belongsTo(Theme, {
  foreignKey: 'themeId'
})

User.hasMany(Like, {
  foreignKey: 'userId',
  as: aliases.likes
})
Like.belongsTo(User, {
  foreignKey: 'userId'
})

export { User, Theme, Feedback, News, Comment, Like }
