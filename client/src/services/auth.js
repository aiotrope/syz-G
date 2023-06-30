//import { http } from '../utils/http'
//import { config } from '../utils/config'
import axios from 'axios'

const createUser = async (data) => {
  const response = await axios.post('/api/user/signup', data, {
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
  })
  if (response.status === 201 && response.data) {
    return response.data
  }
}

export const authService = {
  createUser,
}
