<template>
  <section class="grid gap-6 lg:grid-cols-2">
    <article
      v-for="panel in panels"
      :key="panel.title"
      class="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:border-sky-400/60"
    >
      <header class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl">
          {{ panel.icon }}
        </div>
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">{{ panel.badge }}</p>
          <h3 class="text-2xl font-semibold text-slate-900">{{ panel.title }}</h3>
        </div>
      </header>
      <p class="mt-3 text-slate-600">{{ panel.description }}</p>
      <ul class="mt-5 space-y-2 text-sm text-slate-600">
        <li v-for="highlight in panel.highlights" :key="highlight" class="flex items-center gap-2">
          <span class="text-sky-500">•</span>
          {{ highlight }}
        </li>
      </ul>
      <RouterLink
        :to="panel.cta.to"
        class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800"
      >
        {{ panel.cta.label }}
        <span aria-hidden="true">↗</span>
      </RouterLink>
    </article>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const panels = [
  {
    badge: 'Teachers',
    title: 'The broadcast-ready control room',
    icon: '🎥',
    description:
      'Spin up branded classrooms with scheduling, invite codes, tasks, and analytics. Manage co-hosts and push on-demand replays with one click.',
    highlights: [
      'Auto emails & reminders per cohort',
      'Realtime seat availability & waitlists',
      'Studio overlays and multistream output'
    ],
    cta: { label: 'Open teacher desk', to: '/dashboard/teacher' }
  },
  {
    badge: 'Students',
    title: 'A personal learning diary',
    icon: '📚',
    description:
      'Learners get a consolidated feed of upcoming sessions, replays, and class resources with timezone-aware notifications.',
    highlights: [
      'Smart reminders in your timezone',
      'Playback links & resources organized per session',
      'Lightweight progress tracking and streaks'
    ],
    cta: { label: 'Visit student hub', to: '/dashboard/student' }
  }
]
</script>
