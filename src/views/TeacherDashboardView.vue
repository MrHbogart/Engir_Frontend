<template>
  <section class="space-y-8">
    <header class="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg shadow-slate-200/70">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Teacher dashboard</p>
          <h2 class="mt-3 text-3xl font-semibold text-slate-900">Welcome back, {{ data.teacher?.full_name || 'teacher' }}.</h2>
          <p class="mt-2 text-slate-600">Command your classrooms, watch signals, and go live without stress.</p>
          <p v-if="isPreview" class="mt-2 text-sm text-amber-600">Preview mode · Create a free account to publish.</p>
        </div>
        <div class="flex flex-col gap-3 text-sm sm:flex-row">
          <button
            type="button"
            class="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
            @click="reload"
          >
            Refresh data
          </button>
          <button
            type="button"
            class="rounded-full border border-sky-200 px-4 py-2 text-sky-700 transition hover:bg-sky-50"
            @click="handleCreateClassroom"
          >
            Create classroom
          </button>
          <button
            type="button"
            class="rounded-full border border-slate-200 px-4 py-2 text-slate-600 transition hover:bg-slate-100"
            @click="handleScheduleSession"
          >
            Schedule session
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
      <section v-if="controlRoomSession" class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <header class="mb-4 flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Control room</p>
            <h3 class="text-xl font-semibold text-slate-900">Prep your next broadcast</h3>
          </div>
          <span class="text-xs text-slate-500">Auto-syncs every minute</span>
        </header>
        <SessionActionCard :session="controlRoomSession" />
      </section>

      <section>
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-xl font-semibold">Your classrooms</h3>
          <span class="text-sm text-slate-400">{{ data.classes.length }} active</span>
        </div>
        <TransitionGroup name="list-fade" tag="div" class="grid gap-4 md:grid-cols-2">
          <article
            v-for="classroom in data.classes"
            :key="classroom.id"
            class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <header class="flex items-center justify-between gap-2">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Classroom</p>
                <h4 class="text-lg font-semibold text-slate-900">{{ classroom.title }}</h4>
              </div>
              <span class="text-xs text-sky-600">Code: {{ classroom.code }}</span>
            </header>
            <p class="mt-2 text-sm text-slate-600 line-clamp-3">{{ classroom.description }}</p>
            <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt class="text-xs uppercase tracking-[0.3em] text-slate-500">Capacity</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ classroom.available_seats }} / {{ classroom.capacity }}</dd>
              </div>
              <div>
                <dt class="text-xs uppercase tracking-[0.3em] text-slate-500">Public</dt>
                <dd class="mt-1 font-semibold text-slate-900">{{ classroom.is_public ? 'Yes' : 'Private' }}</dd>
              </div>
            </dl>
          </article>
        </TransitionGroup>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Upcoming sessions</h3>
            <span class="text-xs text-slate-500">Next 10</span>
          </div>
          <TransitionGroup name="list-fade" tag="ul" class="space-y-3 text-sm">
            <li
              v-for="session in data.upcoming_sessions"
              :key="session.id"
              class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p class="font-semibold text-slate-900">{{ session.title }}</p>
              <p class="text-slate-600">{{ formatDate(session.starts_at) }} · {{ session.status }}</p>
            </li>
          </TransitionGroup>
          <p v-if="!data.upcoming_sessions.length" class="text-slate-500">No scheduled sessions yet.</p>
        </div>
        <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-slate-900">Recent enrollments</h3>
            <span class="text-xs text-slate-500">Latest 10</span>
          </div>
          <TransitionGroup name="list-fade" tag="ul" class="space-y-3 text-sm">
            <li
              v-for="enrollment in data.recent_enrollments"
              :key="enrollment.id"
              class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p class="font-semibold text-slate-900">{{ enrollment.full_name }}</p>
              <p class="text-slate-600">{{ enrollment.email }} · {{ enrollment.classroom?.title }}</p>
            </li>
          </TransitionGroup>
          <p v-if="!data.recent_enrollments.length" class="text-slate-500">No enrollments recorded.</p>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import SessionActionCard from '@/components/SessionActionCard.vue'
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

const previewTeacherData = {
  teacher: { full_name: 'Prof. Avery Harper' },
  classes: [
    {
      id: 1,
      title: 'Cinematic Lighting 101',
      description: 'Deep dive into lighting theory and practical demonstrations with downloadable presets.',
      code: 'LIGHT-21',
      available_seats: 8,
      capacity: 24,
      is_public: true
    },
    {
      id: 2,
      title: 'Zero Downtime Deploys',
      description: 'Blueprint to launch features with confidence using blue/green strategy.',
      code: 'DEPLOY-88',
      available_seats: 3,
      capacity: 18,
      is_public: false
    }
  ],
  upcoming_sessions: [
    {
      id: 11,
      title: 'Camera movement critique',
      starts_at: new Date(Date.now() + 3600 * 1000 * 6).toISOString(),
      status: 'scheduled',
      host_url: 'https://engir.live/host?code=LIGHT-21',
      playback_url: '',
      stream_key: 'ck_light_2390'
    }
  ],
  recent_enrollments: [
    { id: 7, full_name: 'Noor E.', email: 'noor@example.com', classroom: { title: 'Cinematic Lighting 101' } },
    { id: 8, full_name: 'Dev K.', email: 'dev@example.com', classroom: { title: 'Zero Downtime Deploys' } }
  ]
}

const isPreview = computed(() => props.preview && !auth.isAuthenticated)

const data = computed(() => {
  if (isPreview.value) {
    return previewTeacherData
  }
  return dashboard.teacherData || previewTeacherData
})

const stats = computed(() => {
  const classes = data.value.classes || []
  const seatsReserved = classes.reduce((sum, classroom) => sum + (classroom.capacity - classroom.available_seats), 0)
  const capacity = classes.reduce((sum, classroom) => sum + classroom.capacity, 0)
  const utilization = capacity ? Math.round((seatsReserved / capacity) * 100) : 0
  return [
    { label: 'Classes', value: classes.length || 0, caption: 'Active classroom streams' },
    { label: 'Seats filled', value: seatsReserved, caption: `${utilization}% utilization` },
    { label: 'Upcoming sessions', value: data.value.upcoming_sessions?.length || 0, caption: 'Next seven days' }
  ]
})

const controlRoomSession = computed(() => data.value.upcoming_sessions?.[0])

const reload = () => {
  if (isPreview.value) return
  dashboard.loadTeacherDashboard()
}

const requireSignup = () => {
  router.push({ name: 'signup', query: { redirect: '/dashboard/teacher' } })
}

const handleCreateClassroom = () => {
  if (isPreview.value || !auth.isAuthenticated) {
    requireSignup()
    return
  }
  router.push({ name: 'teacher-dashboard' })
}

const handleScheduleSession = () => {
  if (isPreview.value || !auth.isAuthenticated) {
    requireSignup()
    return
  }
  router.push({ name: 'teacher-dashboard' })
}

const formatDate = (value) => {
  if (!value) return 'TBD'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

onMounted(() => {
  if (isPreview.value) return
  dashboard.loadTeacherDashboard()
})
</script>
