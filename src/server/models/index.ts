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
  foreignKey: 'themeId',
  as: aliases.Theme
})
User.belongsTo(Theme, {
  foreignKey: 'themeId',
  as: aliases.User
})

News.hasMany(Comment, {
  foreignKey: 'newsId',
  as: aliases.News
})
Comment.belongsTo(Comment, {
  foreignKey: 'newsId',
  as: aliases.Comment
})

User.hasMany(Comment, {
  foreignKey: 'userId',
  as: aliases.UserComment
})
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: aliases.CommentUser
})

export { User, Theme, Feedback, News }
