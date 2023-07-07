const config = require('../config')
const ioredis = require('ioredis')
const RedisStore = require('connect-redis').default
const { promisify } = require('util')
const logger = require('./logger')

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

module.exports = cache
