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
        baseColor: '#17151c',
        secondColor: '#000000',
        fieldColor: '#2a2731',
        accentColor: '#2264d1',
        textColor: '#eeecf1',
        articleBgColor: '#1c1a22',
        subTextColor: '#7a7585'
      },
      {
        name: 'light',
        default: true,
        baseColor: '#f1f1f1',
        secondColor: '#000000',
        fieldColor: '#ffffff',
        accentColor: '#2264d1',
        textColor: '#000000',
        articleBgColor: '#ffffff',
        subTextColor: '#7a7585'
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
