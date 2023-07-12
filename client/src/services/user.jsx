import axios from 'axios'

import { authService } from './auth'
import jwtDecode from 'jwt-decode'

const baseUrl = process.env.REACT_APP_BASE_URL

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/api/user/all`, {
    withCredentials: true,
  })
  if (response.status === 200 && response.data) return response.data
}

const getMe = async () => {
  const accessToken = authService.getAccessToken()

  const response = await axios.get(`${baseUrl}/api/user/me`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })
  if (response.status === 200 && response.data) return response.data
}

const updateUser = async (data) => {
  const accessToken = authService.getAccessToken()

  const user = jwtDecode(accessToken)

  const response = await axios.patch(`${baseUrl}/api/user/update/${user.id}`, data, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })

  if (response.status === 200 && response.data) return response.data
}

const updateUserAvatar = async (data) => {
  const accessToken = authService.getAccessToken()

  const user = jwtDecode(accessToken)

  const response = await axios.patch(`${baseUrl}/api/user/update/avatar/${user.id}`, data, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })

  if (response.status === 200 && response.data) return response.data
}

export const userService = {
  getUsers,
  getMe,
  updateUser,
  updateUserAvatar,
}
