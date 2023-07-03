//import config from '../utils/config'
//import jwt from 'jsonwebtoken'
//import User from '../models/user'

const getGoogleUser = async (req, res) => {

  try {
    if (req.user) {
      return res.status(200).json(req.user)
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

export default {
  getGoogleUser,
}
