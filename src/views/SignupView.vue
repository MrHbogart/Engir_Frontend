<template>
  <section class="mx-auto max-w-3xl space-y-8">
    <header class="text-center">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Create account</p>
      <h2 class="mt-3 text-4xl font-semibold">Join Engir as a teacher or student.</h2>
      <p class="mt-2 text-slate-300">
        All signups are free. Teachers can launch livestream classrooms, and students can explore sessions instantly.
      </p>
    </header>

    <form class="space-y-6 rounded-3xl border border-white/10 bg-night-800/70 p-8 shadow-xl" @submit.prevent="submit">
      <div class="flex flex-wrap gap-4 text-sm">
        <label class="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2">
          <input v-model="form.role" type="radio" value="student" />
          <span>Student</span>
        </label>
        <label class="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2">
          <input v-model="form.role" type="radio" value="teacher" />
          <span>Teacher</span>
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <label class="text-sm">
          <span class="text-slate-300">Full name</span>
          <input
            v-model="form.full_name"
            type="text"
            required
            class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            placeholder="Avery Harper"
          />
        </label>
        <label class="text-sm">
          <span class="text-slate-300">Email</span>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label class="block text-sm">
        <span class="text-slate-300">Password</span>
        <input
          v-model="form.password"
          type="password"
          minlength="8"
          required
          class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
          placeholder="At least 8 characters"
        />
      </label>

      <div v-if="form.role === 'teacher'" class="grid gap-4 md:grid-cols-2">
        <label class="text-sm">
          <span class="text-slate-300">Headline</span>
          <input
            v-model="form.headline"
            type="text"
            class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            placeholder="Film professor & presenter"
          />
        </label>
        <label class="text-sm">
          <span class="text-slate-300">Profile URL</span>
          <input
            v-model="form.profile_url"
            type="url"
            class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
            placeholder="https://your-site.com"
          />
        </label>
      </div>

      <label class="block text-sm" v-if="form.role === 'student'">
        <span class="text-slate-300">Timezone</span>
        <select
          v-model="form.timezone"
          class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
        >
          <option disabled value="">Select your timezone</option>
          <option v-for="tz in timezoneOptions" :key="tz" :value="tz">
            {{ tz }}
          </option>
        </select>
      </label>

      <label class="block text-sm">
        <span class="text-slate-300">Bio (optional)</span>
        <textarea
          v-model="form.bio"
          rows="4"
          class="mt-1 w-full rounded-2xl border border-white/10 bg-night-950/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
          placeholder="Tell us a bit about yourself."
        />
      </label>

      <button
        type="submit"
        :disabled="submitting"
        class="w-full rounded-2xl bg-sky-500 px-4 py-3 text-center text-sm font-semibold text-night-900 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {{ submitting ? 'Creating account…' : 'Create account' }}
      </button>
    </form>

    <p v-if="error" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-center text-sm text-rose-100">
      {{ error }}
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { registerStudent, registerTeacher } from '@/api/auth'
import { useAuthStore } from '@/state/authStore'

const router = useRouter()
const auth = useAuthStore()
const error = ref('')
const submitting = ref(false)
const timezoneOptions = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tehran',
  'Asia/Tokyo',
  'Asia/Kolkata',
  'Australia/Sydney'
]

const form = reactive({
  role: 'student',
  full_name: '',
  email: '',
  password: '',
  bio: '',
  headline: '',
  profile_url: '',
  timezone: ''
})

const submit = async () => {
  if (submitting.value) return
  submitting.value = true
  error.value = ''
  try {
    if (form.role === 'teacher') {
      await registerTeacher({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        headline: form.headline,
        profile_url: form.profile_url
      })
    } else {
      await registerStudent({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        timezone: form.timezone
      })
    }

    await auth.login({ username: form.email, password: form.password })
    if (auth.userRole === 'teacher') {
      router.push({ name: 'teacher-dashboard' })
    } else {
      router.push({ name: 'student-dashboard' })
    }
  } catch (err) {
    error.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>
