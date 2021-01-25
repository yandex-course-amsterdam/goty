import mongoose from 'mongoose'

import { app } from './app'
import { sequelize } from './sequelize'
// import { Theme, News } from './models'

const connectPostgres = async () => {
  await sequelize.sync()
  // .then(() => {
  //   Theme.bulkCreate([
  //     {
  //       name: 'dark',
  //       default: true,
  //       baseColor: '#17151c',
  //       secondColor: '#000000',
  //       fieldColor: '#2a2731',
  //       accentColor: '#2264d1',
  //       textColor: '#eeecf1',
  //       articleBgColor: '#1c1a22',
  //       subTextColor: '#7a7585'
  //     },
  //     {
  //       name: 'light',
  //       default: true,
  //       baseColor: '#f1f1f1',
  //       secondColor: '#000000',
  //       fieldColor: '#ffffff',
  //       accentColor: '#2264d1',
  //       textColor: '#000000',
  //       articleBgColor: '#ffffff',
  //       subTextColor: '#7a7585'
  //     }
  //   ])

  //   News.create({
  //     title: 'Title',
  //     description: 'Description'
  //   })
  // })
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

const startServer = async () => {
  await connectPostgres()
  await connectMongo()

  const PORT = process.env.PORT || 5000

  app.listen(process.env.PORT || PORT)
}

startServer()
