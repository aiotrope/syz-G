import axios from 'axios'

import { authService } from './auth'

const baseUrl = import.meta.env.VITE_BASE_URL

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/post`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

const createPost = async (data) => {
  const accessToken = authService.getAccessToken()

  const response = await axios.post(`${baseUrl}/api/post`, data, {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
  })

  if (response.status === 201 && response.data) return response.data
}

const getPostById = async (id) => {
  const response = await axios.get(`${baseUrl}/api/post/${id}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

const search = async (searchText) => {
  const response = await axios.get(`${baseUrl}/api/post?search=${searchText}`, {
    withCredentials: true,
  })

  if (response.status === 200 && response.data) return response.data
}

export const postService = {
  getAll,
  createPost,
  getPostById,
  search,
}
