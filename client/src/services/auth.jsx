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

// for deletion
const getGoogleAuthorizationUrl = async () => {
  const response = await axios.get('/api/user/google/callback', {
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'multipart/form-data' },
  })
  console.log(response)
  if (response) return response
}

const getGoogleUser = async () => {
  const response = await axios.get('/api/user/google-user', {
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
  })

  if (response.data) {
    console.log(response.data)
    return response
  }
}

export const authService = {
  createUser,
  login,
  getAccessToken,
  getUserById,
  removeAccessTokens,
  getGoogleAuthorizationUrl,
  getGoogleUser,
}
