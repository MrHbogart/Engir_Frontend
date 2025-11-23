<template>
  <section class="space-y-8">
    <header class="rounded-3xl border border-white/10 bg-night-800/60 px-6 py-8">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Student dashboard</p>
      <h2 class="mt-3 text-3xl font-semibold">Hi {{ data?.student?.full_name || 'student' }}!</h2>
      <p class="mt-2 text-slate-300">Track your enrollments, grab invite links, and see what is coming next.</p>
    </header>

    <div v-if="dashboard.loading" class="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
      Loading dashboard…
    </div>
    <div v-else-if="dashboard.error" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
      {{ dashboard.error }}
    </div>

    <div v-else class="space-y-10">
      <section class="rounded-3xl border border-white/10 bg-night-900/60 p-5">
        <header class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold">Upcoming sessions</h3>
          <button type="button" class="text-sm text-sky-300 hover:text-sky-200" @click="reload">Refresh</button>
        </header>
        <ul class="space-y-3 text-sm">
          <li
            v-for="session in data.upcoming_sessions"
            :key="session.id"
            class="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
          >
            <p class="font-semibold">{{ session.title }}</p>
            <p class="text-slate-300">
              {{ session.classroom?.title }} · {{ formatDate(session.starts_at) }} ·
              <span class="text-sky-200">{{ session.status }}</span>
            </p>
            <a
              v-if="session.playback_url"
              :href="session.playback_url"
              target="_blank"
              rel="noreferrer"
              class="text-xs text-sky-300 hover:text-sky-200"
            >
              Join stream ↗
            </a>
          </li>
          <li v-if="!data.upcoming_sessions.length" class="text-slate-400">No scheduled sessions.</li>
        </ul>
      </section>

      <section class="rounded-3xl border border-white/10 bg-night-900/60 p-5">
        <header class="mb-4 flex items-center justify-between">
          <h3 class="text-lg font-semibold">Enrollments</h3>
          <RouterLink to="/explore" class="text-sm text-sky-300 hover:text-sky-200">Find more classes ↗</RouterLink>
        </header>
        <div class="grid gap-4 md:grid-cols-2">
          <article
            v-for="enrollment in data.enrollments"
            :key="enrollment.id"
            class="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm"
          >
            <p class="font-semibold">{{ enrollment.classroom?.title }}</p>
            <p class="text-slate-300">
              Teacher: {{ enrollment.classroom?.teacher?.full_name }} · Status: {{ enrollment.status }}
            </p>
            <p class="mt-2 text-xs text-slate-400">Invite code: {{ enrollment.classroom?.code }}</p>
          </article>
          <p v-if="!data.enrollments.length" class="text-slate-400">No enrollments yet. Join a class!</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useDashboardStore } from '@/state/dashboardStore'

const dashboard = useDashboardStore()
const data = computed(() => dashboard.studentData || { enrollments: [], upcoming_sessions: [] })

const reload = () => {
  dashboard.loadStudentDashboard()
}

const formatDate = (value) => {
  if (!value) return 'TBD'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

onMounted(() => {
  dashboard.loadStudentDashboard()
})
</script>
