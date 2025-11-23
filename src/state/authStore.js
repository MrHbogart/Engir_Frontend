import { defineStore } from 'pinia'

import { loginRequest, fetchMe } from '@/api/auth'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || '',
    loading: false,
    error: '',
    initialized: false
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken && state.user),
    userRole: (state) => state.user?.role ?? 'guest'
  },
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = ''
      try {
        const payload = await loginRequest(credentials)
        this.accessToken = payload.access
        this.refreshToken = payload.refresh
        this.user = payload.user
        localStorage.setItem(ACCESS_TOKEN_KEY, this.accessToken)
        localStorage.setItem(REFRESH_TOKEN_KEY, this.refreshToken)
        this.initialized = true
        return this.user
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async bootstrap() {
      if (this.initialized) return
      if (!this.accessToken) {
        this.initialized = true
        return
      }
      try {
        this.user = await fetchMe()
      } catch (error) {
        this.logout()
        console.warn('Failed to refresh session:', error.message)
      } finally {
        this.initialized = true
      }
    },
    logout() {
      this.user = null
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
    }
  }
})
