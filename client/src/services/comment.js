import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

const getCommentById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/comment/${id}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

const getCommentsByUser= async (id) => {
  const response = await axios.get(`${baseUrl}/api/comment/user/${id}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

const getCommentsByPostId = async (postId) => {
  const response = await axios.get(`${baseUrl}/api/comment/post/${postId}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/comment`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

export const commentService = {
  getCommentById,
  getCommentsByPostId,
  getAll,
  getCommentsByUser
}
