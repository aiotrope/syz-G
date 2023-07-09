const cache = require('../utils/redis')
const logger = require('../utils/logger')

const getFbUser = async (req, res) => {
  try {
    const savedUser = await cache.getAsync('currentUser')

    logger.warn('USER = require( Google route ', JSON.parse(savedUser))

    const userEmail = JSON.parse(savedUser).email
    console.log(userEmail)

    return res.status(200).json({
      success: `${userEmail} signed-in`,
      googleUser: JSON.parse(savedUser),
    })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const fbController = {
  getFbUser,
}

module.exports = fbController
