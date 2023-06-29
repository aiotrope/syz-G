import { config } from '../config'
import axios from 'axios'

export const http = axios.create({
  baseURL: config.base_url,
  withCredentials: true,
  timeout: 60000,
})
