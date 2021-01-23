const dotenv = require('dotenv')

dotenv.config({ path: './config-local.env' })

require('./build/server')
