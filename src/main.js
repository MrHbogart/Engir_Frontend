import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import '@/styles.css'
import { useAuthStore } from '@/state/authStore'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore()
const DEFAULT_TITLE = 'Engir · Learning Streams'

router.beforeEach(async (to, from, next) => {
  if (!auth.initialized) {
    await auth.bootstrap()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.meta.role && auth.userRole !== to.meta.role) {
    const fallback =
      auth.userRole === 'teacher'
        ? { name: 'teacher-dashboard' }
        : auth.userRole === 'student'
          ? { name: 'student-dashboard' }
          : { name: 'landing' }
    return next(fallback)
  }

  if ((to.name === 'login' || to.name === 'signup') && auth.isAuthenticated) {
    return next(auth.userRole === 'teacher' ? { name: 'teacher-dashboard' } : { name: 'student-dashboard' })
  }

  if (to.name === 'teacher-preview' && auth.isAuthenticated) {
    return next({ name: 'teacher-dashboard' })
  }

  if (to.name === 'student-preview' && auth.isAuthenticated) {
    return next({ name: 'student-dashboard' })
  }

  return next()
})

router.afterEach((to) => {
  document.title = to.meta?.title || DEFAULT_TITLE
})

app.use(router)
app.mount('#app')
