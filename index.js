const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  // В противном случае переменные окружения задаются с помощью docker-compose.yml
  dotenv.config({ path: './config-local.env' })
}

require('./build/server')
