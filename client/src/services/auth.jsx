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

const removeAccessTokens = () => {
  localStorage.removeItem('access')
}

const getGoogleUserToken = async () => {
  const response = await axios.get('/api/google/user', {
    withCredentials: true,
  })
  if (response.data) {
    return response.data
  }
}

export const authService = {
  createUser,
  login,
  getAccessToken,
  getUserById,
  removeAccessTokens,
  getGoogleUserToken,
}