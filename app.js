const { app } = require('./src/server/server')

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT || PORT)
