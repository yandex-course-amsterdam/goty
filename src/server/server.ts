import fs from 'fs'
import https from 'https'

import { connectDB } from './db/connections'
import { app } from './app'

const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

const server = https.createServer(credentials, app)

const startServer = async () => {
  connectDB()
  const PORT = process.env.PORT || 5000
  server.listen(process.env.PORT || PORT)
}

startServer()
