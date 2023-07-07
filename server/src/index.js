import config from './config'
import app from './app'
import http from 'http'

import logger from './utils/logger'

const server = http.createServer(app)

const port = config.port
server.listen(port, () => {
  logger.http(`Server is running on port ${port}`)
})

////   ../.././
