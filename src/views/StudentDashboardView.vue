<template>
  <section class="space-y-8">
    <header class="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg shadow-slate-200/70">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Student dashboard</p>
          <h2 class="mt-3 text-3xl font-semibold text-slate-900">Hi {{ data.student?.full_name || 'student' }}!</h2>
          <p class="mt-2 text-slate-600">Track enrollments, pin replays, and see what is coming next.</p>
          <p v-if="isPreview" class="mt-2 text-sm text-amber-600">Preview mode · Join Engir to unlock enrollments.</p>
        </div>
        <div class="flex flex-col gap-3 text-sm sm:flex-row">
          <button type="button" class="rounded-full border border-slate-200 px-4 py-2 text-slate-600" @click="reload">Refresh</button>
          <button
            type="button"
            class="rounded-full border border-sky-200 px-4 py-2 text-sky-700 transition hover:bg-sky-50"
            @click="handleJoinClass"
          >
            Join a class
          </button>
        </div>
      </div>
      <div class="mt-5 grid gap-4 sm:grid-cols-3">
        <article v-for="stat in stats" :key="stat.label" class="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm">
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">{{ stat.label }}</p>
          <p class="mt-2 text-3xl font-semibold text-slate-900">{{ stat.value }}</p>
          <p class="text-slate-500">{{ stat.caption }}</p>
        </article>
      </div>
    </header>

    <div v-if="dashboard.loading" class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
      Loading dashboard…
    </div>
    <div v-else-if="dashboard.error" class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
      {{ dashboard.error }}
    </div>

    <div v-else class="space-y-10">
      <section class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <header class="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-semibold text-slate-900">Upcoming sessions</h3>
            <p class="text-sm text-slate-500">Auto-converts to your timezone</p>
          </div>
          <button type="button" class="text-sm text-sky-600 hover:text-sky-800" @click="reload">Refresh</button>
        </header>
        <TransitionGroup name="list-fade" tag="ul" class="space-y-3 text-sm">
          <li
            v-for="session in data.upcoming_sessions"
            :key="session.id"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <p class="font-semibold text-slate-900">{{ session.title }}</p>
            <p class="text-slate-600">
              {{ session.classroom?.title }} · {{ formatDate(session.starts_at) }} ·
              <span class="text-sky-600">{{ session.status }}</span>
            </p>
            <a
              v-if="session.playback_url"
              :href="session.playback_url"
              target="_blank"
              rel="noreferrer"
              class="text-xs text-sky-600 hover:text-sky-800"
            >
              Join stream ↗
            </a>
          </li>
        </TransitionGroup>
        <p v-if="!data.upcoming_sessions.length" class="text-slate-500">No scheduled sessions.</p>
      </section>

      <section class="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <header class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Enrollments</h3>
            <RouterLink to="/explore" class="text-sm text-sky-600 hover:text-sky-800">Find more classes ↗</RouterLink>
          </header>
          <TransitionGroup name="list-fade" tag="div" class="grid gap-4 md:grid-cols-2">
            <article
              v-for="enrollment in data.enrollments"
              :key="enrollment.id"
              class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm"
            >
              <p class="font-semibold text-slate-900">{{ enrollment.classroom?.title }}</p>
              <p class="text-slate-600">
                Teacher: {{ enrollment.classroom?.teacher?.full_name }} · Status: {{ enrollment.status }}
              </p>
              <p class="mt-2 text-xs text-slate-500">Invite code: {{ enrollment.classroom?.code }}</p>
            </article>
          </TransitionGroup>
          <p v-if="!data.enrollments.length" class="text-slate-500">No enrollments yet. Join a class!</p>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900">Focus panel</h3>
          <ul class="mt-4 space-y-3">
            <li class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Learning streak</p>
              <p class="text-2xl font-semibold text-slate-900">{{ streak }} days</p>
              <p class="text-slate-500">Attend one live stream today to keep it alive.</p>
            </li>
            <li class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Reminder window</p>
              <p class="text-lg font-semibold text-slate-900">{{ reminderWindow }}</p>
              <p class="text-slate-500">You will get SMS + email one hour before each session.</p>
            </li>
            <li class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Next action</p>
              <p class="text-lg font-semibold text-slate-900">Review replays</p>
              <p class="text-slate-500">Catch up on missed lessons directly from your dashboard.</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '@/state/authStore'
import { useDashboardStore } from '@/state/dashboardStore'

const props = defineProps({
  preview: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const auth = useAuthStore()
const dashboard = useDashboardStore()

const previewStudentData = {
  student: { full_name: 'Jordan Riley', timezone: 'America/New_York' },
  upcoming_sessions: [
    {
      id: 31,
      title: 'Mindfulness for founders',
      classroom: { title: 'Founders Wellness Lab' },
      starts_at: new Date(Date.now() + 3600 * 1000 * 8).toISOString(),
      status: 'scheduled',
      playback_url: 'https://engir.live/join?code=WELL-21'
    },
    {
      id: 32,
      title: 'Zero downtime deployments',
      classroom: { title: 'DevOps Sprint Club' },
      starts_at: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
      status: 'upcoming',
      playback_url: ''
    }
  ],
  enrollments: [
    {
      id: 41,
      status: 'confirmed',
      classroom: { title: 'Founders Wellness Lab', teacher: { full_name: 'Coach Galya' }, code: 'WELL-21' }
    },
    {
      id: 42,
      status: 'waitlisted',
      classroom: { title: 'DevOps Sprint Club', teacher: { full_name: 'Avery Rao' }, code: 'DEV-44' }
    }
  ]
}

const isPreview = computed(() => props.preview && !auth.isAuthenticated)

const data = computed(() => {
  if (isPreview.value) {
    return previewStudentData
  }
  return dashboard.studentData || previewStudentData
})

const stats = computed(() => [
  { label: 'Upcoming sessions', value: data.value.upcoming_sessions?.length || 0, caption: 'This week' },
  { label: 'Confirmed seats', value: data.value.enrollments?.length || 0, caption: 'Active enrollments' },
  {
    label: 'Watch later',
    value: data.value.upcoming_sessions?.filter((item) => item.status !== 'live').length || 0,
    caption: 'Replays pending'
  }
])

const streak = computed(() => Math.max(1, data.value.upcoming_sessions?.length || 1))
const reminderWindow = computed(() => (data.value.student?.timezone ? `${data.value.student.timezone} · 60 min` : '60 min before'))

const reload = () => {
  if (isPreview.value) return
  dashboard.loadStudentDashboard()
}

const requireSignup = () => {
  router.push({ name: 'signup', query: { redirect: '/dashboard/student' } })
}

const handleJoinClass = () => {
  if (isPreview.value || !auth.isAuthenticated) {
    requireSignup()
    return
  }
  router.push({ name: 'explore-sessions' })
}

const formatDate = (value) => {
  if (!value) return 'TBD'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

onMounted(() => {
  if (isPreview.value) return
  dashboard.loadStudentDashboard()
})
</script>
