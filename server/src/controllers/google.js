import config from '../utils/config'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const getGoogleUser = async (req, res) => {
  //console.log('USER', req.session.currentUser)

  try {
    const googleUser = await User.findOne({ email: req?.user?.email })
    const payload = { id: googleUser?.id, email: googleUser?.email }

    const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '1h' })

    const decoded = jwt.verify(token, config.jwt_secret)

    return res.status(200).json({
      message: `${decoded.email} signed-in via Gmail`,
      access: token,
    })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

export default {
  getGoogleUser,
}
