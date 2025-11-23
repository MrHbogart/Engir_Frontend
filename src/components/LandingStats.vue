<template>
  <section class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.4em] text-slate-500">Signal board</p>
        <h3 class="text-2xl font-semibold text-slate-900">Realtime health & adoption</h3>
      </div>
      <span class="rounded-full border border-emerald-200 px-3 py-1 text-xs text-emerald-700">All systems green</span>
    </header>
    <dl class="mt-6 grid gap-4 md:grid-cols-3">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-400"
      >
        <dt class="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
          {{ stat.label }}
          <span class="text-[10px] text-emerald-700">{{ stat.trend }}</span>
        </dt>
        <dd class="mt-2 text-3xl font-semibold text-slate-900">{{ stat.value }}</dd>
        <p class="mt-1 text-sm text-slate-500">{{ stat.caption }}</p>
      </div>
    </dl>
  </section>
</template>

<script setup>
const stats = [
  { label: 'Enrollments', value: '32.4K', caption: 'active student seats per week', trend: '+12%' },
  { label: 'Session quality', value: '4.92', caption: 'avg. feedback score from polls', trend: '+3bp' },
  { label: 'Support tickets', value: '8.3 hrs', caption: 'median resolution time', trend: '-18%' }
]
</script>
