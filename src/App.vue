<template>
  <div class="min-h-screen bg-night-900 text-white">
    <header class="border-b border-white/10 bg-night-950/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <RouterLink to="/" class="flex items-center gap-3">
          <img src="/engir-logo.svg" alt="Engir logo" class="h-10 w-10" />
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Engir</p>
            <h1 class="text-xl font-bold">Learning Streams</h1>
          </div>
        </RouterLink>

        <nav class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <RouterLink to="/" class="hover:text-white" active-class="text-sky-300">Landing</RouterLink>
          <RouterLink to="/explore" class="hover:text-white" active-class="text-sky-300">Explore</RouterLink>
          <RouterLink
            v-if="auth.userRole === 'teacher'"
            to="/dashboard/teacher"
            class="hover:text-white"
            active-class="text-sky-300"
          >
            Teacher desk
          </RouterLink>
          <RouterLink
            v-if="auth.userRole === 'student'"
            to="/dashboard/student"
            class="hover:text-white"
            active-class="text-sky-300"
          >
            Student desk
          </RouterLink>
        </nav>

        <div class="flex items-center gap-3 text-sm">
          <span v-if="auth.isAuthenticated" class="rounded-full border border-white/10 px-3 py-1 text-slate-200">
            {{ auth.user?.first_name || auth.user?.email }} · {{ auth.userRole }}
          </span>
          <template v-else>
            <RouterLink
              to="/signup"
              class="rounded-full border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
            >
              Create account
            </RouterLink>
            <RouterLink
              to="/login"
              class="rounded-full border border-sky-500/50 px-4 py-2 text-sky-200 transition hover:bg-sky-500/10"
            >
              Sign in
            </RouterLink>
          </template>
          <button
            v-if="auth.isAuthenticated"
            type="button"
            class="rounded-full border border-rose-500/40 px-4 py-2 text-rose-200 transition hover:bg-rose-500/10"
            @click="handleLogout"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto min-h-[calc(100vh-88px)] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useAuthStore } from '@/state/authStore'
import { useDashboardStore } from '@/state/dashboardStore'

const auth = useAuthStore()
const dashboard = useDashboardStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  dashboard.clear()
  router.push({ name: 'landing' })
}
</script>
