import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/post`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

export const postService = {
  getAll,
}
