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
  foreignKey: 'theme_id'
})
User.belongsTo(Theme, {
  foreignKey: 'theme_id',
  as: aliases.theme
})

News.hasMany(Comment, {
  foreignKey: 'news_id',
  as: aliases.comments
})
Comment.belongsTo(News, {
  foreignKey: 'news_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: aliases.user
})
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: aliases.user
})

News.hasMany(Like, {
  foreignKey: 'news_id',
  as: aliases.likes
})
Like.belongsTo(News, {
  foreignKey: 'news_id'
})

User.hasMany(Like, {
  foreignKey: 'user_id',
  as: aliases.likes
})
Like.belongsTo(User, {
  foreignKey: 'user_id'
})

export { User, Theme, Feedback, News, Comment, Like }
