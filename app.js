const { app } = require('./build/app')

const PORT = process.env.PORT || 5000

app.listen(process.env.PORT || PORT)
