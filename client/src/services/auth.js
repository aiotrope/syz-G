import { http } from '../utils/http'

const createUser = async (data) => {
  const response = await http.post('/user/signup', data)
  if (response.status === 201 && response.data) {
    return response.data
  }
}

export const authService = {
  createUser,
}
