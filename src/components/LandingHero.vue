<template>
  <section class="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
    <article class="rounded-[32px] border border-slate-200 bg-white px-8 py-10 shadow-xl shadow-slate-200/70">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Live learning OS</p>
      <h2 class="mt-4 text-4xl font-semibold leading-tight text-slate-900">
        A cinematic classroom console for teachers and students.
      </h2>
      <p class="mt-4 max-w-3xl text-lg text-slate-600">
        Launch polished landing pages, stream sessions, coordinate enrollments, and drop recordings — all from a single
        dashboard. Engir handles scheduling, invites, and playback so you can focus on teaching.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink
          to="/signup"
          class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:translate-y-0.5"
        >
          Create workspace
          <span aria-hidden="true">↗</span>
        </RouterLink>
        <RouterLink
          to="/explore"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-500"
        >
          Explore public sessions
        </RouterLink>
      </div>

      <dl class="mt-10 grid gap-6 sm:grid-cols-3">
        <div
          v-for="highlight in highlights"
          :key="highlight.label"
          class="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm"
        >
          <dt class="text-xs uppercase tracking-[0.4em] text-slate-500">{{ highlight.label }}</dt>
          <dd class="mt-2 text-2xl font-semibold text-slate-900">{{ highlight.value }}</dd>
          <p class="mt-1 text-slate-500">{{ highlight.caption }}</p>
        </div>
      </dl>
    </article>

    <article class="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/80">
      <header class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Live schedule</p>
          <h3 class="text-xl font-semibold text-slate-900">Next production slate</h3>
        </div>
        <span class="rounded-full border border-sky-200 px-3 py-1 text-xs text-sky-600">Auto-sync</span>
      </header>
      <ul class="space-y-3 text-sm">
        <li v-for="session in sessions" :key="session.id" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs uppercase tracking-[0.4em] text-slate-500">{{ session.track }}</p>
          <p class="mt-1 text-lg font-semibold text-slate-900">{{ session.title }}</p>
          <p class="text-slate-600">{{ session.when }} · {{ session.host }}</p>
          <p class="mt-2 text-xs text-slate-500">{{ session.description }}</p>
        </li>
      </ul>
      <div class="rounded-2xl border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-5 text-sm">
        <p class="text-xs uppercase tracking-[0.4em] text-sky-700">Realtime signal</p>
        <p class="mt-1 text-slate-700">Latency monitor stable · All regions <span class="text-emerald-600">healthy</span></p>
        <p class="text-slate-500">Streams auto-scale when a session exceeds 600 viewers.</p>
      </div>
    </article>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const highlights = [
  { label: 'Teachers onboarded', value: '1,240+', caption: 'Verified creators running Engir' },
  { label: 'Average rating', value: '4.9/5', caption: 'Learner reviews across cohorts' },
  { label: 'Streaming uptime', value: '99.98%', caption: 'Multi-region, auto healing' }
]

const sessions = [
  {
    id: 1,
    track: 'Production',
    title: 'Cinematic lighting masterclass',
    when: 'Today · 7:00 PM UTC',
    host: 'with Prof. Mendes',
    description: 'Live Q&A, downloadable lighting presets and assignments.'
  },
  {
    id: 2,
    track: 'Wellness',
    title: 'Mindfulness for founders',
    when: 'Tomorrow · 2:00 PM UTC',
    host: 'with Coach Galya',
    description: 'Student breakout rooms and auto-transcribed recaps.'
  },
  {
    id: 3,
    track: 'Engineering',
    title: 'Zero-downtime deployments',
    when: 'Friday · 5:30 PM UTC',
    host: 'with Avery Rao',
    description: 'Invite-only lab stream with shared terminal output.'
  }
]
</script>
