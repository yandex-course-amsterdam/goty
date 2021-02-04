import { connectDB } from './db/connections'
import { app } from './app'

const startServer = async () => {
  connectDB()
  const PORT = process.env.PORT || 5000
  app.listen(process.env.PORT || PORT)
}

startServer()
