import config from '../config'
import ioredis from 'ioredis'
import { promisify } from 'util'
import logger from './logger'

let getAsync
let setAsync
let redisClient

if (!config.redis_url) {
  const redisIsDisabled = () => {
    logger.error('No Redis URL set, Redis is disabled')
    return null
  }

  getAsync = redisIsDisabled

  setAsync = redisIsDisabled
} else {
  redisClient = new ioredis(config.redis_url)

  getAsync = promisify(redisClient.get).bind(redisClient)

  setAsync = promisify(redisClient.set).bind(redisClient)
}

const cache = {
  redisClient,
  getAsync,
  setAsync,
}

export default cache
