const dotenv = require('dotenv')
const mongodb = require('mongodb')

dotenv.config()

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  module.exports = client.db() // returns DB object that we can work with -- ex. perform CRUD operations
  const app = require('./app')
  app.listen(process.env.PORT)
})  