import axios from 'axios'

import { ACCESS_TOKEN_KEY } from '@/constants'

const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'

const client = axios.create({
  baseURL: apiBaseURL,
  timeout: 10000
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const payload = error.response?.data
    const detail = payload?.detail || payload?.message
    const firstError =
      typeof payload === 'object' && payload
        ? Object.values(payload).find((value) => Array.isArray(value) && value.length > 0)
        : null
    const message = detail || firstError?.[0] || error.message || 'Request failed'
    return Promise.reject(new Error(message))
  }
)

export default client
