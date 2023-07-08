const config = require('./config')
const app = require('./app')
const http = require('http')

const logger = require('./utils/logger')

const server = http.createServer(app)

const port = config.port

server.listen(port, () => {
  logger.http(`Server is running on port ${port}`)
})
