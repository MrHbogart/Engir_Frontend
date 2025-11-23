import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
      meta: { title: 'Engir · Live classrooms and immersive learning' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Sign in · Engir' }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: { title: 'Create account · Engir' }
    },
    {
      path: '/explore',
      name: 'explore-sessions',
      component: () => import('@/views/SessionsExploreView.vue'),
      meta: { title: 'Explore sessions · Engir' }
    },
    {
      path: '/dashboard/teacher',
      name: 'teacher-dashboard',
      component: () => import('@/views/TeacherDashboardView.vue'),
      meta: { requiresAuth: true, role: 'teacher', title: 'Teacher dashboard · Engir' }
    },
    {
      path: '/dashboard/student',
      name: 'student-dashboard',
      component: () => import('@/views/StudentDashboardView.vue'),
      meta: { requiresAuth: true, role: 'student', title: 'Student hub · Engir' }
    },
    {
      path: '/preview/teacher',
      name: 'teacher-preview',
      component: () => import('@/views/TeacherDashboardView.vue'),
      props: { preview: true },
      meta: { title: 'Preview teacher desk · Engir' }
    },
    {
      path: '/preview/student',
      name: 'student-preview',
      component: () => import('@/views/StudentDashboardView.vue'),
      props: { preview: true },
      meta: { title: 'Preview student hub · Engir' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
