const config = require('../config')
const ioredis = require('ioredis')
const { promisify } = require('util')
const logger = require('./logger')

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

module.exports = cache
