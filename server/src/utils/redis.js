import config from './config'
import ioredis from 'ioredis'
//import connectRedis from 'connect-redis'
//import session from 'express-session'
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

  //redisStore = new connectRedis(session)({ client: redisClient })

  getAsync = promisify(redisClient.get).bind(redisClient)

  setAsync = promisify(redisClient.set).bind(redisClient)
}

const cache = {
  redisClient,
  redisStore,
  getAsync,
  setAsync,
}

export default cache
