<template>
  <section class="mx-auto max-w-lg space-y-8 rounded-3xl border border-white/10 bg-night-800/70 p-8 shadow-2xl">
    <header class="space-y-2 text-center">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Account access</p>
      <h2 class="text-3xl font-semibold">Sign in to your Engir workspace</h2>
      <p class="text-sm text-slate-400">
        Teachers and students share the same portal. Use the credentials generated via
        <code>seed_demo_data</code> or your own account.
      </p>
    </header>

    <form class="space-y-4" @submit.prevent="submit">
      <label class="block text-sm">
        <span class="text-slate-300">Email</span>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 w-full rounded-2xl border border-white/10 bg-night-900/70 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
          placeholder="mentor@engir.demo"
        />
      </label>

      <label class="block text-sm">
        <span class="text-slate-300">Password</span>
        <input
          v-model="form.password"
          type="password"
          required
          class="mt-1 w-full rounded-2xl border border-white/10 bg-night-900/70 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
          placeholder="••••••••"
        />
      </label>

      <button
        type="submit"
        :disabled="auth.loading"
        class="w-full rounded-2xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-night-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {{ auth.loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>

    <p v-if="auth.error" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-100">
      {{ auth.error }}
    </p>

    <p class="text-center text-xs text-slate-500">
      Need demo data? Run <code>python manage.py seed_demo_data</code> then use <code>mentor@engir.demo</code> /
      <code>demo-classroom</code>.
    </p>
    <p class="text-center text-sm text-slate-400">
      New here?
      <RouterLink to="/signup" class="text-sky-300 hover:text-sky-200">Create a free Engir account.</RouterLink>
    </p>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/state/authStore'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  if (auth.loading) return
  try {
    const user = await auth.login({ username: form.email.trim(), password: form.password })
    const redirect = route.query.redirect
    if (typeof redirect === 'string') {
      router.push(redirect)
      return
    }
    if (user.role === 'teacher') {
      router.push({ name: 'teacher-dashboard' })
    } else if (user.role === 'student') {
      router.push({ name: 'student-dashboard' })
    } else {
      router.push({ name: 'explore-sessions' })
    }
  } catch (error) {
    console.error('Login failed', error.message)
  }
}
</script>
