const cache = require('../utils/redis')
const logger = require('../utils/logger')

const getGoogleUser = async (req, res) => {
  try {
    const savedUser = await cache.getAsync('currentUser')
    //const sess = req.session

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

const googleController = {
  getGoogleUser
}

module.exports = googleController