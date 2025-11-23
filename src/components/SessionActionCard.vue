<template>
  <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70">
    <header class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Session</p>
        <h3 class="text-lg font-semibold text-slate-900">{{ session.title }}</h3>
        <p class="text-sm text-slate-600">{{ formatDate(session.starts_at) }}</p>
      </div>
      <span
        class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        :class="session.status === 'live' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'"
      >
        {{ session.status }}
      </span>
    </header>

    <dl class="mt-4 space-y-3 text-sm">
      <div>
        <dt class="text-slate-500">Host URL</dt>
        <dd v-if="session.host_url" class="break-words text-slate-800">
          <a :href="session.host_url" target="_blank" rel="noreferrer" class="text-sky-600 hover:underline">
            {{ session.host_url }}
          </a>
        </dd>
        <dd v-else class="text-slate-500">Pending broadcast link</dd>
      </div>
      <div>
        <dt class="text-slate-500">Playback URL</dt>
        <dd v-if="session.playback_url" class="break-words text-slate-800">
          <a :href="session.playback_url" target="_blank" rel="noreferrer" class="text-sky-600 hover:underline">
            {{ session.playback_url }}
          </a>
        </dd>
        <dd v-else class="text-slate-500">Replay will appear when uploaded</dd>
      </div>
      <div>
        <dt class="text-slate-500">Stream key</dt>
        <dd class="font-mono text-sm text-slate-900">{{ session.stream_key || '••••••••' }}</dd>
      </div>
    </dl>

    <footer class="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        class="flex-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-sky-300"
        @click="$emit('regenerate')"
      >
        Rotate key
      </button>
      <button
        v-if="session.status !== 'live'"
        type="button"
        class="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-sm text-white"
        @click="$emit('start')"
      >
        Go live
      </button>
      <button
        v-else
        type="button"
        class="flex-1 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 px-3 py-2 text-sm text-white"
        @click="$emit('end')"
      >
        End stream
      </button>
    </footer>
  </article>
</template>

<script setup>
const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const formatDate = (iso) => {
  if (!iso) return 'TBD'
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
}
</script>

<style scoped>
footer button:hover {
  opacity: 0.9;
}
</style>
