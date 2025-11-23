<template>
  <section class="space-y-12">
    <div class="rounded-3xl border border-white/10 bg-gradient-to-r from-night-800 to-night-700/70 px-8 py-12 shadow-xl">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Live learning</p>
      <h2 class="mt-4 text-4xl font-semibold leading-tight">Teach and attend immersive classroom streams.</h2>
      <p class="mt-4 max-w-3xl text-lg text-slate-300">
        Engir connects teachers and students through rich, studio-quality sessions. Manage your courses, share invite
        codes, and stay close to your learning community with one modern platform.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/explore"
          class="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-night-950 transition hover:bg-sky-400"
        >
          Explore sessions
        </RouterLink>
        <RouterLink
          to="/signup"
          class="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Create account
        </RouterLink>
      </div>
    </div>

    <div class="space-y-6">
      <header class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Featured classrooms</p>
          <h3 class="mt-2 text-2xl font-semibold">See what teachers are hosting this week</h3>
        </div>
        <RouterLink to="/explore" class="text-sm text-sky-300 hover:text-sky-200">View all sessions ↗</RouterLink>
      </header>

      <div v-if="store.error" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
        {{ store.error }}
      </div>
      <div
        v-else-if="store.loading"
        class="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200"
      >
        Loading featured classes…
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ClassCard v-for="classroom in featured" :key="classroom.id" :classroom="classroom" />
      </div>
    </div>

    <section class="rounded-3xl border border-white/10 bg-night-800/70 p-8 text-center">
      <p class="text-sm uppercase tracking-[0.4em] text-slate-400">Ready to go live?</p>
      <h3 class="mt-3 text-3xl font-semibold">Create your Engir classroom today.</h3>
      <p class="mt-2 text-slate-300">
        Teachers can seed demo data with <code>python manage.py seed_demo_data</code> then log in using the generated
        credentials.
      </p>
      <RouterLink
        to="/login"
        class="mt-6 inline-flex rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-night-900 transition hover:bg-white"
      >
        Access the console
      </RouterLink>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ClassCard from '@/components/ClassCard.vue'
import { useClassroomStore } from '@/state/classroomStore'

const store = useClassroomStore()

const featured = computed(() => store.items.slice(0, 3))

const loadFeatured = () => {
  store.load({ ordering: '-updated_at', limit: 6, is_public: true })
}

onMounted(() => {
  if (!store.items.length) {
    loadFeatured()
  }
})
</script>
