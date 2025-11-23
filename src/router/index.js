import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/explore',
      name: 'explore-sessions',
      component: () => import('@/views/SessionsExploreView.vue')
    },
    {
      path: '/dashboard/teacher',
      name: 'teacher-dashboard',
      component: () => import('@/views/TeacherDashboardView.vue'),
      meta: { requiresAuth: true, role: 'teacher' }
    },
    {
      path: '/dashboard/student',
      name: 'student-dashboard',
      component: () => import('@/views/StudentDashboardView.vue'),
      meta: { requiresAuth: true, role: 'student' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
