import config from '../config'
import jwt from 'jsonwebtoken'
import cache from '../utils/redis'

const getGoogleUserAccessToken = async (req, res) => {
  try {
    const savedToken = await cache.getAsync('access')

    const parseToken = JSON.parse(savedToken)

    const decoded = jwt.verify(parseToken, config.jwt_secret)

    if (decoded) {
      return res.status(200).json({
        success: `${decoded.email} signed-in`,
        access: parseToken,
      })
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const googleController = {
  getGoogleUserAccessToken,
}

export default googleController
