import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const createUser = async (data) => {
  const response = await axios.post(`${baseUrl}/api/user/signup`, data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.status === 201 && response.data) {
    return response.data
  }
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/api/user/signin`, credentials, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.status === 200 && response.data) {
    return response.data
  }
}

const getAccessToken = () => {
  const token = JSON.parse(localStorage.getItem('JWT'))
  return token.jwt_atom
}

const getUserById = async (id) => {
  const accessToken = getAccessToken()

  const response = await axios.get(`${baseUrl}/api/user/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })
  if (response.status === 200 && response.data) return response.data
}

const clearJWTLocalStorage = () => {
  window.localStorage.removeItem('JWT')
}

const uploadAvatar = async (image) => {
  const accessToken = getAccessToken()

  const response = await axios.patch(`${baseUrl}/api/user/avatar`, image, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })

  if (response.status === 201 && response.data) return response.data
}

const getUserAvatar = async (userId) => {
  const response = await axios.get(`${baseUrl}/api/user/avatar/${userId}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

export const authService = {
  createUser,
  login,
  getAccessToken,
  getUserById,
  clearJWTLocalStorage,
  uploadAvatar,
  getUserAvatar,
}
