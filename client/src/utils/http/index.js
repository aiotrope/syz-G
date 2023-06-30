//import { config } from '../config'
import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
  timeout: 80000,
  headers: { 'Content-Type': 'application/json' },
})
