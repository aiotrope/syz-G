import cache from '../utils/redis.mjs'
import logger from '../utils/logger.mjs'

const getFbUser = async (req, res) => {
  try {
    const savedUser = await cache.getAsync('currentUser')
    //const sess = req.session

    logger.warn('USER FROM Google route ', JSON.parse(savedUser))

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

export default {
  getFbUser,
}
