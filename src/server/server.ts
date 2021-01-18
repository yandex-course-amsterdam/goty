import { app } from './app'
import { sequelize } from './sequelize'
;(async () => {
  await sequelize.sync()

  const PORT = process.env.PORT || 5000

  app.listen(process.env.PORT || PORT)
})()
