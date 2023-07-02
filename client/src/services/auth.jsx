import axios from 'axios'

const createUser = async (data) => {
  const response = await axios.post('http://127.0.0.1:8080/api/user/signup', data, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })
  if (response.status === 201 && response.data) {
    return response.data
  }
}

const login = async (credentials) => {
  const response = await axios.post('http://127.0.0.1:8080/api/user/signin', credentials, {
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

  const response = await axios.get(`http://127.0.0.1:8080/api/user/${id}`, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })
  if (response.status === 200 && response.data) return response.data
}

const removeAccessTokens = () => {
  localStorage.removeItem('access')
}

const getGoogleUser = async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:8080/api/google/user', {
      withCredentials: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
    if (response.data) {
      console.log('Google user', response.data)
      //localStorage.setItem('googleAccess', JSON.stringify(response.data.access))
      return response.data
    }
  } catch (err) {
    console.error(err)
  }
}

export const authService = {
  createUser,
  login,
  getAccessToken,
  getUserById,
  removeAccessTokens,
  getGoogleUser,
}
