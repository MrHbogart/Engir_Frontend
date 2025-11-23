<template>
  <section class="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl lg:grid-cols-[1.1fr,0.9fr]">
    <div class="space-y-8">
      <header class="space-y-2">
        <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Account access</p>
        <h2 class="text-3xl font-semibold text-slate-900">Sign in to your Engir workspace</h2>
        <p class="text-sm text-slate-600">
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
            class="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-sky-400 focus:outline-none"
            placeholder="mentor@engir.demo"
          />
        </label>

        <label class="block text-sm">
          <span class="text-slate-300">Password</span>
          <input
            v-model="form.password"
            type="password"
            required
            class="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-sky-400 focus:outline-none"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {{ auth.loading ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p v-if="auth.error" class="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-600">
        {{ auth.error }}
      </p>

      <p class="text-xs text-slate-500">
        Need demo data? Run <code>python manage.py seed_demo_data</code> then use <code>mentor@engir.demo</code> /
        <code>demo-classroom</code>.
      </p>
      <p class="text-sm text-slate-600">
        New here?
        <RouterLink to="/signup" class="text-sky-600 hover:text-sky-800">Create a free Engir account.</RouterLink>
      </p>
    </div>

    <aside class="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Status</p>
      <h3 class="mt-2 text-xl font-semibold text-slate-900">All systems operational</h3>
      <ul class="mt-4 space-y-3">
        <li class="rounded-2xl border border-slate-200 bg-white p-4">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Teacher desk</p>
          <p class="text-slate-600">Review classrooms, rotate stream keys, and publish new sessions.</p>
        </li>
        <li class="rounded-2xl border border-slate-200 bg-white p-4">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Student hub</p>
          <p class="text-slate-600">Grab invite codes, check replays, and sync reminders.</p>
        </li>
        <li class="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
          <p class="text-xs uppercase tracking-[0.3em] text-emerald-700">Latency</p>
          <p>Streaming latency steady at 140ms. Recording pipeline healthy.</p>
        </li>
      </ul>
    </aside>
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
