import { defineStore } from 'pinia'

import { fetchClassrooms } from '@/api/classrooms'

export const useClassroomStore = defineStore('classrooms', {
  state: () => ({
    items: [],
    loading: false,
    error: ''
  }),
  actions: {
    async load(params = {}) {
      this.loading = true
      this.error = ''
      try {
        const data = await fetchClassrooms(params)
        this.items = data.results ?? data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  },
  getters: {
    publicClasses(state) {
      return state.items.filter((item) => item.is_public)
    }
  }
})
