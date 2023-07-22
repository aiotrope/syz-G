import User from '../src/models/user'

const savedUsers = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const helper = {
    savedUsers
}

export default helper
