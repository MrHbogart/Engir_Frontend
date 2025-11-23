<template>
  <article class="rounded-3xl border border-white/10 bg-night-700/80 p-5 shadow-lg shadow-black/20">
    <header class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Session</p>
        <h3 class="text-lg font-semibold">{{ session.title }}</h3>
        <p class="text-sm text-slate-300">{{ formatDate(session.starts_at) }}</p>
      </div>
      <span
        class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
        :class="session.status === 'live' ? 'bg-rose-500/20 text-rose-200' : 'bg-slate-600/40 text-slate-200'"
      >
        {{ session.status }}
      </span>
    </header>

    <dl class="mt-4 space-y-3 text-sm">
      <div>
        <dt class="text-slate-400">Host URL</dt>
        <dd class="break-words text-slate-100">
          <a :href="session.host_url" target="_blank" rel="noreferrer" class="text-sky-300 hover:underline">
            {{ session.host_url }}
          </a>
        </dd>
      </div>
      <div>
        <dt class="text-slate-400">Playback URL</dt>
        <dd class="break-words text-slate-100">
          <a :href="session.playback_url" target="_blank" rel="noreferrer" class="text-sky-300 hover:underline">
            {{ session.playback_url }}
          </a>
        </dd>
      </div>
      <div>
        <dt class="text-slate-400">Stream key</dt>
        <dd class="font-mono text-sm text-white">{{ session.stream_key }}</dd>
      </div>
    </dl>

    <footer class="mt-5 flex flex-wrap gap-3">
      <button
        type="button"
        class="flex-1 rounded-2xl border border-white/20 px-3 py-2 text-sm text-white transition hover:border-sky-300"
        @click="$emit('regenerate')"
      >
        Rotate key
      </button>
      <button
        v-if="session.status !== 'live'"
        type="button"
        class="flex-1 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-3 py-2 text-sm text-night-900"
        @click="$emit('start')"
      >
        Go live
      </button>
      <button
        v-else
        type="button"
        class="flex-1 rounded-2xl bg-gradient-to-r from-rose-400 to-amber-400 px-3 py-2 text-sm text-night-900"
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

const formatDate = (iso) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
</script>

<style scoped>
footer button:hover {
  opacity: 0.9;
}
</style>
