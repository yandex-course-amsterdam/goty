const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  // В противном случае переменные окружения задаются с помощью docker-compose.yml
  dotenv.config({ path: process.env.LOCAL_FILE || './.env' })
}

require('./build/server')
