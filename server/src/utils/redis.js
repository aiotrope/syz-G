import config from './config'
import ioredis from 'ioredis'
import RedisStore from 'connect-redis'
import { promisify } from 'util'
import logger from './logger'

let getAsync
let setAsync
let redisClient
let redisStore

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

  redisStore = new RedisStore({
    client: redisClient,
  })
}

const cache = {
  redisClient,
  redisStore,
  getAsync,
  setAsync,
}

export default cache
