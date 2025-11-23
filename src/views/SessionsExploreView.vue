<template>
  <section>
    <header class="rounded-3xl border border-white/10 bg-night-800/60 px-6 py-8">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Session explorer</p>
      <h2 class="mt-3 text-3xl font-semibold">Browse upcoming teacher-led streams</h2>
      <p class="mt-2 text-slate-300">Filter by title, invite code, or teacher name. All listings are public.</p>
      <form class="mt-6 flex flex-col gap-3 sm:flex-row" @submit.prevent="search">
        <input
          v-model="query"
          type="text"
          class="flex-1 rounded-2xl border border-white/10 bg-night-900/60 px-4 py-3 text-white focus:border-sky-400 focus:outline-none"
          placeholder="Search by class name or teacher"
        />
        <button
          type="submit"
          class="rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-night-900 transition hover:bg-sky-400"
        >
          Search
        </button>
      </form>
    </header>

    <div v-if="store.loading" class="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
      Loading sessions…
    </div>
    <div v-else-if="store.error" class="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">
      {{ store.error }}
    </div>

    <div v-else class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <ClassCard v-for="classroom in store.publicClasses" :key="classroom.id" :classroom="classroom" />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import ClassCard from '@/components/ClassCard.vue'
import { useClassroomStore } from '@/state/classroomStore'

const store = useClassroomStore()
const query = ref('')

const load = (params = {}) => {
  store.load({
    is_public: true,
    search: query.value || undefined,
    ordering: params.ordering ?? '-updated_at'
  })
}

const search = () => load({})

onMounted(() => {
  if (!store.items.length) {
    load({})
  }
})
</script>
