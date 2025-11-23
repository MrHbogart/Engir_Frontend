<template>
  <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Launch in minutes</p>
        <h3 class="text-2xl font-semibold text-slate-900">From signup to your first broadcast</h3>
      </div>
      <RouterLink to="/signup" class="text-sm text-sky-600 hover:text-sky-800">Start free ↗</RouterLink>
    </header>
    <ol class="mt-6 grid gap-4 md:grid-cols-4">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative rounded-3xl border border-slate-200 bg-slate-50 p-4"
      >
        <span class="absolute -top-3 left-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
          0{{ index + 1 }}
        </span>
        <h4 class="mt-4 text-lg font-semibold text-slate-900">{{ step.title }}</h4>
        <p class="mt-1 text-sm text-slate-600">{{ step.copy }}</p>
        <p class="mt-3 text-xs text-slate-500">{{ step.tip }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const steps = [
  {
    title: 'Create your workspace',
    copy: 'Sign up as a teacher or student and personalize your profile in less than a minute.',
    tip: 'Brand colors + avatar instantly sync to invites.'
  },
  {
    title: 'Publish the first classroom',
    copy: 'Set capacity, invite codes, streaming links, and automation windows.',
    tip: 'Engir enforces seat limits & waitlisting for you.'
  },
  {
    title: 'Invite learners',
    copy: 'Share unique codes or open the listing publicly to the discovery feed.',
    tip: 'Students get timezone-aware reminders.'
  },
  {
    title: 'Broadcast with confidence',
    copy: 'Start the virtual stage, trigger overlays, and drop replays when you are done.',
    tip: 'Playback, notes, and chat transcripts archive automatically.'
  }
]
</script>
