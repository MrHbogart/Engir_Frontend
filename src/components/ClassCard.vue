<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70">
    <header class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Classroom</p>
        <h3 class="text-lg font-semibold text-slate-900">{{ classroom.title }}</h3>
      </div>
      <span class="text-sm text-sky-600">Code: {{ classroom.code }}</span>
    </header>

    <p class="mt-2 text-sm text-slate-600">{{ classroom.description || 'No description yet.' }}</p>

    <dl class="mt-4 grid grid-cols-2 gap-4 text-sm">
      <div>
        <dt class="uppercase text-[0.65rem] tracking-[0.3em] text-slate-500">Teacher</dt>
        <dd class="mt-1 font-semibold text-slate-900">{{ classroom.teacher?.full_name }}</dd>
      </div>
      <div>
        <dt class="uppercase text-[0.65rem] tracking-[0.3em] text-slate-500">Capacity</dt>
        <dd class="mt-1 font-semibold text-slate-900">{{ classroom.available_seats }} / {{ classroom.capacity }}</dd>
      </div>
    </dl>

    <section v-if="classroom.next_session" class="mt-5 rounded-2xl bg-sky-50 p-4">
      <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Next session</p>
      <p class="mt-1 text-sm">
        {{ formatDate(classroom.next_session.starts_at) }}
        <span class="font-semibold text-sky-600">({{ classroom.next_session.status }})</span>
      </p>
      <a
        v-if="classroom.next_session.playback_url"
        :href="classroom.next_session.playback_url"
        target="_blank"
        rel="noreferrer"
        class="mt-2 inline-flex items-center text-sm font-medium text-sky-600"
      >
        Watch link
        <span class="ml-1">↗</span>
      </a>
    </section>
  </article>
</template>

<script setup>
const props = defineProps({
  classroom: {
    type: Object,
    required: true
  }
})

const formatDate = (iso) => {
  if (!iso) return 'TBD'
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(iso))
}
</script>

<style scoped>
a:hover {
  text-decoration: underline;
}
</style>
