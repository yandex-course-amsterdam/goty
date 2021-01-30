import mongoose from 'mongoose'

import { sequelize } from '../sequelize'
import { Theme, News } from '../models'

const connectPostgres = async () => {
  // Дропаем имеющиеся темы...
  await Theme.sync({ force: true }).then(() => {
    Theme.bulkCreate([
      {
        name: 'dark',
        default: true,
        base_color: '#17151c',
        second_color: '#000000',
        field_color: '#2a2731',
        accent_color: '#2264d1',
        text_color: '#eeecf1',
        article_bg_color: '#1c1a22',
        sub_text_color: '#7a7585'
      },
      {
        name: 'light',
        default: true,
        base_color: '#f1f1f1',
        second_color: '#000000',
        field_color: '#ffffff',
        accent_color: '#2264d1',
        text_color: '#000000',
        article_bg_color: '#ffffff',
        sub_text_color: '#7a7585'
      }
    ])
  })

  // ...и новости...
  await News.sync({ force: true }).then(() => {
    News.bulkCreate([
      {
        title: 'First article',
        description:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, culpa fugit cupiditate recusandae magnam dolores quae amet assumenda, soluta unde aut nulla.'
      },
      {
        title: 'Second article',
        description:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti, culpa fugit cupiditate recusandae magnam dolores quae amet assumenda, soluta unde aut nulla.'
      }
    ])
  })

  // ...а остальное просто синхронизируем
  await sequelize.sync()
}

const connectMongo = async () => {
  await mongoose.connect(
    process.env.MONGO_DB || 'mongodb://localhost:27017/gotydb',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  )
}

export const connectDB = async (): Promise<void> => {
  await connectPostgres()
  await connectMongo()
}
