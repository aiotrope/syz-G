import axios from 'axios'

const createUser = async (data) => {
  const response = await axios.post('/api/user/signup', data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.status === 201 && response.data) {
    return response.data
  }
}

const login = async (credentials) => {
  const response = await axios.post('/api/user/signin', credentials, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.status === 200 && response.data) {
    localStorage.setItem('access', JSON.stringify(response.data.access))

    return response.data
  }
}

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('access'))
  return user
}

const getUserById = async (id) => {
  const accessToken = getAccessToken()

  const response = await axios.get(`/api/user/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })
  if (response.status === 200 && response.data) return response.data
}

const clearLocalStorage = () => {
  localStorage.clear()
}

const getGoogleUser = async () => {
  const response = await axios.get('/api/google/user', {
    withCredentials: true,
  })
  if (response.data) {
    return response.data
  }
}

const getGoogleUserInfo = () => {
  const user = JSON.parse(localStorage.getItem('googleUser'))
  return user
}

const logout = async (id) => {
  const response = await axios.delete(`/api/user/signout/${id}`, {
    withCredentials: true,
  })

  if (response.status === 204) {
    return response
  }
}

export const authService = {
  createUser,
  login,
  getAccessToken,
  getUserById,
  getGoogleUser,
  getGoogleUserInfo,
  logout,
  clearLocalStorage,
}
