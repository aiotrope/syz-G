import app from './app'
import http from 'http'
import config from './config'
import logger from './utils/logger'

const server = http.createServer(app)

const port = config.port

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})
