import { defineStore } from 'pinia'

import { fetchStudentDashboard, fetchTeacherDashboard } from '@/api/auth'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    teacherData: null,
    studentData: null,
    loading: false,
    error: ''
  }),
  actions: {
    async loadTeacherDashboard() {
      this.loading = true
      this.error = ''
      try {
        this.teacherData = await fetchTeacherDashboard()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async loadStudentDashboard() {
      this.loading = true
      this.error = ''
      try {
        this.studentData = await fetchStudentDashboard()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.teacherData = null
      this.studentData = null
      this.error = ''
      this.loading = false
    }
  }
})
