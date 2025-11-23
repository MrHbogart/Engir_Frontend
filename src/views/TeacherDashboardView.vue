<template>
  <section class="space-y-8">
    <header class="rounded-3xl border border-white/10 bg-night-800/60 px-6 py-8">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Teacher dashboard</p>
      <h2 class="mt-3 text-3xl font-semibold">Welcome back, {{ data?.teacher?.full_name || 'teacher' }}.</h2>
      <p class="mt-2 text-slate-300">Manage your classrooms, monitor enrollments, and jump into live sessions.</p>
      <div class="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
        <span class="rounded-2xl border border-white/10 px-4 py-2">
          Classes <strong class="ml-2 text-white">{{ data?.classes.length || 0 }}</strong>
        </span>
        <span class="rounded-2xl border border-white/10 px-4 py-2">
          Upcoming sessions <strong class="ml-2 text-white">{{ data?.upcoming_sessions.length || 0 }}</strong>
        </span>
        <span class="rounded-2xl border border-white/10 px-4 py-2">
          Recent enrollments <strong class="ml-2 text-white">{{ data?.recent_enrollments.length || 0 }}</strong>
        </span>
      </div>
    </header>

    <div v-if="dashboard.loading" class="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
      Loading dashboard…
    </div>
    <div v-else-if="dashboard.error" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
      {{ dashboard.error }}
    </div>

    <div v-else class="space-y-10">
      <section>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-xl font-semibold">Your classrooms</h3>
          <button
            type="button"
            class="text-sm text-sky-300 hover:text-sky-200"
            @click="reload"
          >
            Refresh
          </button>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <article
            v-for="classroom in data.classes"
            :key="classroom.id"
            class="rounded-3xl border border-white/10 bg-night-900/60 p-5"
          >
            <header class="flex items-center justify-between gap-2">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Classroom</p>
                <h4 class="text-lg font-semibold">{{ classroom.title }}</h4>
              </div>
              <span class="text-xs text-sky-300">Code: {{ classroom.code }}</span>
            </header>
            <p class="mt-2 text-sm text-slate-300 line-clamp-3">{{ classroom.description }}</p>
            <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt class="text-xs uppercase tracking-[0.3em] text-slate-400">Capacity</dt>
                <dd class="mt-1 font-semibold">{{ classroom.available_seats }} / {{ classroom.capacity }}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-[0.3em] text-slate-400">Public</dt>
                <dd class="mt-1 font-semibold">{{ classroom.is_public ? 'Yes' : 'Private' }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-3xl border border-white/10 bg-night-900/60 p-5">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold">Upcoming sessions</h3>
            <span class="text-xs text-slate-400">Next 10</span>
          </div>
          <ul class="space-y-3 text-sm">
            <li
              v-for="session in data.upcoming_sessions"
              :key="session.id"
              class="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              <p class="font-semibold">{{ session.title }}</p>
              <p class="text-slate-300">{{ formatDate(session.starts_at) }} · {{ session.status }}</p>
            </li>
            <li v-if="!data.upcoming_sessions.length" class="text-slate-400">No scheduled sessions yet.</li>
          </ul>
        </div>
        <div class="rounded-3xl border border-white/10 bg-night-900/60 p-5">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold">Recent enrollments</h3>
            <span class="text-xs text-slate-400">Latest 10</span>
          </div>
          <ul class="space-y-3 text-sm">
            <li
              v-for="enrollment in data.recent_enrollments"
              :key="enrollment.id"
              class="rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
            >
              <p class="font-semibold">{{ enrollment.full_name }}</p>
              <p class="text-slate-300">{{ enrollment.email }} · {{ enrollment.classroom?.title }}</p>
            </li>
            <li v-if="!data.recent_enrollments.length" class="text-slate-400">No enrollments recorded.</li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'

import { useDashboardStore } from '@/state/dashboardStore'

const dashboard = useDashboardStore()
const data = computed(() => dashboard.teacherData || { classes: [], upcoming_sessions: [], recent_enrollments: [] })

const reload = () => {
  dashboard.loadTeacherDashboard()
}

const formatDate = (value) => {
  if (!value) return 'TBD'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

onMounted(() => {
  dashboard.loadTeacherDashboard()
})
</script>
