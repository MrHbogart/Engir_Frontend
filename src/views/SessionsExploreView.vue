<template>
  <section>
    <header class="rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg shadow-slate-200/70">
      <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Session explorer</p>
      <h2 class="mt-3 text-3xl font-semibold text-slate-900">Browse upcoming teacher-led streams</h2>
      <p class="mt-2 text-slate-600">Filter by title, invite code, or teacher name. All listings are public.</p>
      <form class="mt-6 flex flex-col gap-3 sm:flex-row" @submit.prevent="search">
        <input
          v-model="query"
          type="text"
          class="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 focus:border-sky-400 focus:outline-none"
          placeholder="Search by class name or teacher"
        />
        <button
          type="submit"
          class="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
        >
          Search
        </button>
      </form>
    </header>

    <div v-if="store.loading" class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
      Loading sessions…
    </div>
    <div v-else-if="store.error" class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
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
