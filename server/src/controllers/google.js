import cache from '../utils/redis'
import logger from '../utils/logger'

const getGoogleUser = async (req, res) => {
  try {
    const savedUser = await cache.getAsync('currentUser')
    const savedToken = await cache.getAsync('access')

    logger.warn('USER FROM Google route ', savedUser)
    logger.warn('Token FROM Google route ', savedToken)

    const userEmail = JSON.parse(savedUser).email

    return res
      .status(200)
      .json({
        message: `${userEmail} signed using Gmail`,
        access: JSON.parse(savedToken),
      })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

export default {
  getGoogleUser,
}
