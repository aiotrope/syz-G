const config = require('../config')
const mongoose = require('mongoose')
const logger = require('./logger')

let dbURL

const opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const dbConnection = () => {
  mongoose.set('strictQuery', false)

  if (process.env.NODE_ENV === 'test') {
    dbURL = config.mongo_url_test
  }

  dbURL = config.mongo_url

  mongoose.connect(dbURL, opts)

  const db = mongoose.connection
  db.once('open', () => {
    logger.http(`Database connected: ${dbURL}`)
  })

  db.on('error', (error) => {
    logger.error(`connection error: ${error}`)
  })
}

module.exports = dbConnection
