<template>
  <section class="space-y-12">
    <LandingHero />
    <LandingLogos />
    <LandingStats />
    <LandingFeaturePanels />

    <div class="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <header class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Featured classrooms</p>
          <h3 class="mt-2 text-2xl font-semibold text-slate-900">See what teachers are hosting this week</h3>
        </div>
        <RouterLink to="/explore" class="text-sm text-sky-600 hover:text-sky-800">View all sessions ↗</RouterLink>
      </header>

      <div v-if="store.error" class="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
        {{ store.error }}
      </div>
      <div
        v-else-if="store.loading"
        class="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500"
      >
        Loading featured classes…
      </div>

      <TransitionGroup name="list-fade" tag="div" class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ClassCard v-for="classroom in featured" :key="classroom.id" :classroom="classroom" />
      </TransitionGroup>
    </div>

    <LandingProcess />
    <LandingTestimonials />

    <section class="rounded-[32px] border border-slate-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-8 text-center shadow-2xl">
      <p class="text-sm uppercase tracking-[0.4em] text-slate-500">Ready to go live?</p>
      <h3 class="mt-3 text-3xl font-semibold text-slate-900">Create your Engir classroom today.</h3>
      <p class="mt-2 text-slate-600">
        Seed demo data with <code>python manage.py seed_demo_data</code> or start fresh—your dashboard is ready.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/signup"
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Create free account
        </RouterLink>
        <RouterLink
          to="/login"
          class="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-500"
        >
          Access the console
        </RouterLink>
      </div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import ClassCard from '@/components/ClassCard.vue'
import LandingFeaturePanels from '@/components/LandingFeaturePanels.vue'
import LandingHero from '@/components/LandingHero.vue'
import LandingLogos from '@/components/LandingLogos.vue'
import LandingProcess from '@/components/LandingProcess.vue'
import LandingStats from '@/components/LandingStats.vue'
import LandingTestimonials from '@/components/LandingTestimonials.vue'
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
